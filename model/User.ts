export interface User {
  id: string;
  name: string;
  edad: string;
  caract: {
    hobby: string[];
    from: {
      Pais: string;
      ciudad: string;
    };
    itemns: string[];
  };
}
