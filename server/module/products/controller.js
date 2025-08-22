import {
  getproductsByIdService,
  getProductsService,
  addProductService,
  addGenderService,
  addCategoriesService,
  addBrandService,
} from "./service.js";

export async function getProductsController(req, res) {
  try {
    const { filter = {}, sort = {} } = req.query;

    const result = await getProductsService(filter, sort);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getProductsByIdController(req, res) {
  try {
    const id = req.params;
    await getproductsByIdService(id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function addProductController(req, res) {
  try {
    await addProductService(req.body);
    res.status(200).json({ message: "successfully added products" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function addGenderController(req, res) {
  try {
    const { gender } = req.body;
    await addGenderService(gender);
    res.status(200).json({ message: "successfully added gender" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export async function addCategoriesController(req, res) {
  try {
    const { categories } = req.body;
    await addCategoriesService(categories);
    res.status(200).json({ message: "successfully added categories" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export async function addBrandController(req, res) {
  try {
    const { brand } = req.body;
    await addBrandService(brand);
    res.status(200).json({ message: "successfully added brand" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
