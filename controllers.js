let books = [
  {
    isbn: "9781593275846",
    title: "Eloquent JavaScript, Second Edition",
    subtitle: "A Modern Introduction to Programming",
    author: "Marijn Haverbeke",
    published: "2014-12-14T00:00:00.000Z",
    publisher: "No Starch Press",
    pages: 472,
    description:
      "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
    website: "http://eloquentjavascript.net/",
  },

  {
    isbn: "9781449331818",
    title: "Learning JavaScript Design Patterns",
    subtitle: "A JavaScript and jQuery Developer's Guide",
    author: "Addy Osmani",
    published: "2012-07-01T00:00:00.000Z",
    publisher: "O'Reilly Media",
    pages: 254,
    description:
      "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
    website:
      "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/",
  },

  {
    isbn: "9781449365035",
    title: "Speaking JavaScript",
    subtitle: "An In-Depth Guide for Programmers",
    author: "Axel Rauschmayer",
    published: "2014-02-01T00:00:00.000Z",
    publisher: "O'Reilly Media",
    pages: 460,
    description:
      "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
    website: "http://speakingjs.com/",
  },
];

function searchBook(isbn) {
  return books.find((book) => book.isbn === isbn);
}

export function getBooks({ response }) {
  response.status = 200;
  response.body = books;
}

export function getBook({ params, response }) {
  const book = searchBook(params.isbn);

  if (book) {
    response.status = 200;
    response.body = book;
  } else {
    response.status = 404;
    response.body = { msg: "Book not found" };
  }
}

export async function addBook({ request, response }) {
  const body = await request.body();
  const value = await body.value;

  books.push(value);

  response.status = 201;
  response.body = { msg: "Ok" };
}

export function deleteBook({ params, response }) {
  books = books.filter((book) => book.isbn !== params.isbn);

  response.status = 200;
  response.body = { msg: "Ok" };
}

export async function updateBook({ params, response, request }) {
  const book = searchBook(params.isbn);

  if (book) {
    const body = await request.body();
    const value = await body.value;
    const title = value.title;

    books = books.map((bk) => {
      if (bk.isbn === book.isbn) {
        return {
          ...bk,
          title,
        };
      }

      return bk;
    });

    response.status = 200;
    response.body = { msg: "Updated" };
  } else {
    response.status = 404;
    response.body = { msg: "Book not found" };
  }
}
