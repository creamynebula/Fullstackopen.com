require("dotenv").config(); //this needs to come first to make environment variables globally available
//Note needs it for instance to get the URI to call DB
const express = require("express");
const cors = require("cors");
const Note = require("./models/note");

const app = express();

app.use(cors()); //cors allow us to serve requests for resources from other origin (like our frontend running in another port)
app.use(express.static("build")); //this means we are using our frontend (built in part2, then compiled)
app.use(express.json()); //activates the json-parser. This means that now requests have a request.body available

const requestLogger = (request, response, next) => {
  //our own custom middleware (functions that can be used to handle request and response objects)
  //this one is executed before every route, since we are calling it before the routes
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next(); //passa o controle para o próximo middleware, todo middleware custom que não retorne uma resposta deve terminar com next();
};

app.use(requestLogger);

app.get("/", (request, response) => {
  console.log("Request:", request);
  response.send("<h1>Olá.\nRecomendo ir para /api/notes</h1>");
});

app.get("/api/notes", (request, response) => {
  //return all notes
  Note.find({}).then((notes) => {
    response.json(notes.map((note) => note.toJSON()));
  });
});

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
    //we don't change date, obviously.
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote.toJSON());
    })
    .catch((error) => next(error));
});

app.post("/api/notes", (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote.toJSON());
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  //this middleware has to be declared after the routes, this makes it be called only if no routes handle the request
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind == "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
