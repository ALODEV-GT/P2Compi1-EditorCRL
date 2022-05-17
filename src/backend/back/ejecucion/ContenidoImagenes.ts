export class ContenidoImagenes {
    private static instance: ContenidoImagenes;
    lista: String[];

    private constructor() {
        this.lista = [];
    }

    public static getInstance(): ContenidoImagenes {
        if (!ContenidoImagenes.instance) {
            ContenidoImagenes.instance = new ContenidoImagenes();
        }
        return ContenidoImagenes.instance;
    }

    public push(linea: string): void {
        this.lista.push(linea);
    }

    public clear(): void {
        this.lista = [];
    }
}
