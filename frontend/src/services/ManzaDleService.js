import api from "../api/axios";

export const registrarResultado = (status) =>
    api.post("manzadle/resultado/", { status });
