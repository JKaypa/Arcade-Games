import request from "supertest";
import app from "../app";

describe("GET /api/videogames", () => {
  
  test("Should respond whith status 200", async () => {
    const response = await request(app).get("/api/videogames");
    expect(response.statusCode).toBe(200);
  });

  test("Should respond id whith status 200", async () => {
    const response = await request(app).get("/api/videogames/123");
    expect(response.statusCode).toBe(200);
  });

  test('Should respond with a videogame object', async () => {
    const response = await request(app).get("/api/videogames/123");
    expect(response.body).toStrictEqual({
      "name": "Titan Quest",
      "image": "https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg",
      "genres": [
        "Action",
        "RPG"
      ],
      "platforms": [
        "PC",
        "Xbox One",
        "Nintendo Switch",
        "PlayStation 4",
        "Android",
        "iOS"
      ],
      "rating": 3.9,
      "released": "2006-06-26",
      "description": "<p>The plot of the game is intimately connected with the mythology of Ancient Greece, Egypt and the East and tells about the campaign of the main hero against a trio of lesser Titans known as Telkines, massive creatures, who took advantage of depriving people of divine guardianship to give the Earth to the power of the Titans.</p>\n<p>In the gameplay, the primary focus is made on destroying numerous monsters and developing character characteristics and skills. The plot is directly divided into three acts, and the game world, respectively, into three broad areas: Ancient Greece, Ancient Egypt and the Ancient East, as well as the final location - Olympus.</p>\n<p>One of the features of the gameplay is the presence of many elements, borrowings and references to lands, characters, weapons and monsters from the ancient mythologies of the Greeks and Egyptians, and the plot bosses are the murderer of Hercules - Nessus, the huge scarab and demonic bull.</p>"
    });
  })

});
