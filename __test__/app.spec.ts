import { describe, test, expect } from "@jest/globals";
import app from "../src/server.js";
import request from "supertest";
import { configuration } from "../src/config.js";
import { afterEach, beforeEach } from "node:test";

describe("Test Suite App", () => {
   
    test("test de endpoint /", async () => {
        return await request(app)
            .get("/")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, esta api fue configurada por el usuario ${configuration.username}`);
            })
    });

    test("test de endpoint /key", async () => {
        return await request(app)
            .get("/key")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, esta api contiene la siguiente api-key: ${configuration.apiKey}`);
            })
    });

    test("test de endpoint /palindromo true", async () => {
        return await request(app)
            .get("/palindromo/Amigo, no gima.")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, La frase ingresada es palindromo`);
            })
    });

    test("test de endpoint /palindromo false", async () => {
        return await request(app)
            .get("/palindromo/Anita lavo la tina")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, La frase ingresada no es palindromo`);
            })
    });

    test("test de endpoint /primo true", async () => {
        return await request(app)
            .get("/primo/239")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, el numero ingresado es un numero primo`);
            })
    });

    test("test de endpoint /primo false 1", async () => {
        return await request(app)
            .get("/primo/1")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, el numero ingresado no es un numero primo`);
            })
    });

    test("test de endpoint /primo false 2", async () => {
        return await request(app)
            .get("/primo/1001")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, el numero ingresado no es un numero primo`);
            })
    });

    test("test de endpoint /primo NaN", async () => {
        return await request(app)
            .get("/primo/12ABC")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, el valor ingresado "12ABC" no es un numero`);
            })
    });

    test("test de endpoint /primo no es numero natural", async () => {
        return await request(app)
            .get("/primo/-3")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, el valor ingresado "-3" no es un numero natural`);
            })
    });

});