import ApiService from "@/models/ApiService";
import type {AxiosResponse} from "axios";
import type {ICategory, IProduct, IVariant, IVariantOptions} from "@/views/bk_products/models/IProduct";


export default class ProductService extends ApiService {
  constructor() {
    super({ baseURL: "/product" });
  }



  async getAllProducts(): Promise<Array<IProduct>> {
    return (await this.get('')).data;
    /*return [
      {
        sku: 48546,
        name: "Leche Gloria",
        id: 1,
        price: 3.5,
        description: "Leche deslactosada",
        isActive: true,
        images: [
          {
            name: "leche",
            src: "https://wongfood.vteximg.com.br/arquivos/ids/412774-1000-1000/Leche-UHT-Entera-Gloria-Botella-946-ml-1-187641794.jpg?v=637492832204330000",
          },
          {
            name: "leche evaporada",
            src: "https://www.gloria.com.pe/uploads/products/descremada.jpg",
          },
          {
            name: "leche dedslac",
            src: "https://qhalimarket.com/wp-content/uploads/2020/09/Leche-Gloria-celeste-400-g-lata-qhali-market-600x600.png",
          },
          {
            name: "lecdhe",
            src: "https://wongfood.vteximg.com.br/arquivos/ids/412774-1000-1000/Leche-UHT-Entera-Gloria-Botella-946-ml-1-187641794.jpg?v=637492832204330000",
          },
          {
            name: "leche evdaporada",
            src: "https://www.gloria.com.pe/uploads/products/descremada.jpg",
          },
          {
            name: "leche ddeslac",
            src: "https://qhalimarket.com/wp-content/uploads/2020/09/Leche-Gloria-celeste-400-g-lata-qhali-market-600x600.png",
          },
        ],
      },
      {
        sku: 45684,
        name: "Pan Bimbo Blanco",
        id: 2,
        price: 6.5,
        description: "Pan de molde familiar blanco 30% mas rendidor",
        isActive: true,
        images: [
          {
            name: "pasdn",
            src: "https://s.cornershopapp.com/product-images/1579725.jpg?versionId=Ioeo2JbpKvIIzScAveEQWRXbL2_SDWx3",
          },
          {
            name: "psdfan",
            src: "https://s.cornershopapp.com/product-images/1579725.jpg?versionId=Ioeo2JbpKvIIzScAveEQWRXbL2_SDWx3",
          },
          {
            name: "pafdsfn",
            src: "https://s.cornershopapp.com/product-images/1579725.jpg?versionId=Ioeo2JbpKvIIzScAveEQWRXbL2_SDWx3",
          },
          {
            name: "pand",
            src: "https://s.cornershopapp.com/product-images/1579725.jpg?versionId=Ioeo2JbpKvIIzScAveEQWRXbL2_SDWx3",
          },
        ],
      },
      {
        sku: 454643,
        name: "Té, canela y clavo",
        id: 3,
        price: 2.19,
        description: "Té, canela y clavo de olor para una deliciosa infusion",
        isActive: false,
        images: [
          {
            name: "té",
            src: "https://www.corporacionliderperu.com/shop/33048-large_default/mc-colins-x-25-te-canela-clavo-exo-igv.jpg",
          },
        ],
      },
    ];*/
  }

  deleteSpecificProduct(id: number) {
  }

  deleteImageFromProduct(productId: number, imagePos: number) {
    console.log("Image at pos: " + imagePos + " was deleted from product -> " + productId);
  }

  async getAllCategories(): Promise<Array<ICategory>> {
    return (await this.get('/categories')).data;
  }

  async getVariantOptions(): Promise<Array<IVariantOptions>>{
    return (await this.get('/variantoptions')).data;
  }

  async getVariants(): Promise<Array<IVariant>>{
    return (await this.get('/variant')).data;
  }
}
