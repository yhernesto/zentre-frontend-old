import type {ICategory, IProduct, IProductImage, IVariant, IVariantOptions} from "@/views/bk_products/models/IProduct";
import ProductService from "@/views/bk_products/service/Product.services";
import {reactive} from "vue";

class ProductController {
  private _allProducts: Array<IProduct> = [];
  private _allCategories: Array<ICategory> = [];
  private _variantOptions: Array<IVariantOptions> = [];
  private _variants: Array<IVariant> = [];
  private _m_productService: ProductService = new ProductService();

  constructor() {
  }

  get AllProducts(): Array<IProduct> {
    return this._allProducts;
  }

  set AllProducts(value: Array<IProduct>) {
    this._allProducts = value;
  }

  async loadInfo() {
    [this._allProducts, this._allCategories, this._variantOptions, this._variants] = await Promise.all([
      this._m_productService.getAllProducts(),
      this._m_productService.getAllCategories(),
      this._m_productService.getVariantOptions(),
      this._m_productService.getVariants()
    ]);
  }

  deleteProduct(productId: number) {
    this._m_productService.deleteSpecificProduct(productId);
  }

  addNewProductTemplate() {
    this._allProducts.push({
      createdAt: 0, pos: 0,
      name: "",
      price: 0,
      isActive: true,
      id: 4,
      description: "",
      sku: 0,
      images: [{src: "", name: ""}]
    });
  }

  removeSpeficiImageProduct(productId: number, image: IProductImage) {
    const imagePos = this._allProducts
      .find((e) => e.id == productId)
      ?.images?.findIndex((e) => e.name == image.name);
    this._m_productService.deleteImageFromProduct(productId, imagePos!);

    const productIndex = this._allProducts.findIndex(
      (e) => e.id === productId
    );
    this._allProducts[productIndex].images = this._allProducts[
      productIndex
      ].images?.filter((e) => e.name != image.name);
  }
}

const productController = reactive(new ProductController());
export default productController;
