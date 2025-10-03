const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.object({
            url: Joi.string().uri().optional(),   // url string hona chahiye
            filename: Joi.string().optional()     // filename optional
        }).optional(),
        // ✅ STRICT: Geometry validation
        geometry: Joi.object({
            type: Joi.string().valid("Point").default("Point"),
            coordinates: Joi.array().items(
                Joi.number().min(-180).max(180)
            ).length(2).required()
        }).optional(),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});