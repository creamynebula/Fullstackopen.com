const dummy = (blogs) => {
  return 1;
};

const totalLikes = (posts) => {
  if (posts.length === 0) return 0;
  else return posts.reduce((result, item) => result + item.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (result, item) => (result = item.likes > result.likes ? item : result),
    blogs[0]
  );
  //if item.likes > currently biggest found, return item, else return currently biggest
  //result will hold most liked blog at the end of the iteration
};

const mostBlogs = (blogs) => {
  //returns the author with the largest amount of blogs
  //returns like { author: "John Smith", blogs: 3 }
  //First collecting the info like {"John Smith": 2, "Terence McKenna": 1, "Misses Blogger": 3}

  let collection = blogs.reduce(
    (result, item) =>
      result.has(item.author) //if the map has a key with the author's name
        ? result.set(item.author, result.get(item.author) + 1) //increate it's count
        : result.set(item.author, 0), //otherwise create key with value '0'
    new Map() //starting point is an empty Map
  );

  let resAuthor; //this will hold the author who wrote most blogs
  let resValue = 0; //this will hold how many blogs the author wrote
  for (let [key, value] of collection) {
    //this gets our returning result
    if (value > resValue) {
      resAuthor = key;
      resValue = value;
    }
  }

  return { author: resAuthor, blogs: resValue };
};

const mostLikes = (blogs) => {
  //first we are gathering info in this format: {'author name': numberOfLikes, ... }
  //
  let collection = blogs.reduce(
    (result, item) =>
      result.has(item.author) //if collection has author
        ? result.set(item.author, result.get(item.author) + item.likes) //update his number of likes adding the likes of current blog
        : result.set(item.author, item.likes), //otherwise create his entry
    new Map()
  );

  let resAuthor; //this will hold the author who got most likes
  let resValue = 0; //this will hold how many likes he got
  for (let [key, value] of collection) {
    //this gets our returning result
    if (value > resValue) {
      resAuthor = key;
      resValue = value;
    }
  }

  return { author: resAuthor, likes: resValue };
};

const mostLikes2 = (blogs) => {
  let collection = new Map();

  for (let x of blogs) {
    if (collection.has(x.author)) {
      //if collection has author already
      collection.set(x.author, collection.get(x.author) + x.likes); //add the current blog number of likes to the registry
    } else {
      //if the collection doesn't have that author yet
      collection.set(x.author, x.likes); //put him in there as a key with his number of likes as a value
    }
  }

  let resAuthor; //this will hold the author who got most likes
  let resValue = 0; //this will hold how many likes he got
  for (let [key, value] of collection) {
    //this gets our returning result
    if (value > resValue) {
      resAuthor = key;
      resValue = value;
    }
  }

  return { author: resAuthor, likes: resValue };
  //console.log("collection:", collection);
};

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
console.log("mostBlogs:", mostBlogs(blogs));
console.log("mostLikes:", mostLikes(blogs));
console.log("mostLikes2:", mostLikes2(blogs));

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
