const Address = require("../models/Address");

exports.getAllAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.findAll();
    res.status(200).json({ count: addresses.length, addresses });
  } catch (error) {
    next(error);
  }
};

exports.createAddress = async (req, res, next) => {
  try {
    const { useType, type, line, city, state, postalcode, country, period_start, period_end } = req.body;
    const address = new Address(useType, type, line, city, state, postalcode, country, period_start, period_end);
    const addressId = await address.save();
    res.status(201).json({ message: "Address created", addressId });
  } catch (error) {
    next(error);
  }
};

exports.getAddressById = async (req, res, next) => {
  try {
    const addressId = req.params.id;
    const address = await Address.findById(addressId);
    res.status(200).json({ address });
  } catch (error) {
    next(error);
  }
};

exports.updateAddressById = async (req, res, next) => {
  try {
    const addressId = req.params.id;
    const { useType, type, line, city, state, postalcode, country, period_start, period_end } = req.body;
    const address = new Address(useType, type, line, city, state, postalcode, country, period_start, period_end);
    address.id = addressId;
    await address.update();
    res.status(200).json({ message: "Address updated" });
  } catch (error) {
    next(error);
  }
};

exports.deleteAddressById = async (req, res, next) => {
  try {
    const addressId = req.params.id;

    // Find patients referencing the address to be deleted
    const patients = await Address.findPatientsByAddressId(addressId);

    // Update patient records to remove the reference to the address
    for (const patient of patients) {
      await Address.updatePatientsAddressId(addressId, null); // Set address_id to NULL or another appropriate value
    }

    // Delete the address after updating patient records
    await Address.deleteById(addressId);

    res.status(200).json({ message: "Address deleted and patients updated" });
  } catch (error) {
    next(error);
  }
};