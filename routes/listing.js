const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

// Index Route - Displays all listings
router.get("/", wrapAsync(listingController.index));

// New Route - Form to create a new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show Route - Displays details of a specific listing
router.get("/:id", wrapAsync(listingController.showListing));

// Create Route - Handles form submission to create a new listing
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.createListing)
);

// Edit Route - Form to edit an existing listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// Update Route - Handles form submission to update an existing listing
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing)
);

// Delete Route - Deletes a specific listing
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
