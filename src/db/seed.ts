import { faker } from "@faker-js/faker";
import { db } from "./index";
import { sql } from "drizzle-orm";

const LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "go",
  "rust",
  "java",
  "cpp",
  "c",
  "ruby",
  "php",
  "swift",
  "kotlin",
  "html",
  "css",
  "json",
  "sql",
  "bash",
  "markdown",
];

const ROAST_TEMPLATES = [
  "This code is so bad, even the compiler is crying.",
  "I've seen better code in a Hello World tutorial.",
  "Your variable names are more confusing than the code itself.",
  "This is why we can't have nice things in programming.",
  "If this code were a joke, you'd be the punchline.",
  "My grandmother codes better than this, and she's been dead for 20 years.",
  "This code would fail a job interview immediately.",
  "The only thing worse than this code is your git commit messages.",
  "This is a perfect example of how NOT to write software.",
  "Did you even read the documentation before writing this?",
  "Congratulations, you've invented a new way to make bugs.",
  "This code has more holes than a slice of Swiss cheese.",
  "Your code is like a horror movie - the callbacks just keep coming.",
  "I've seen better architecture in a pile of spaghetti.",
  "This is what happens when you code at 3am after drinking.",
  "Your variable names are a crime against humanity.",
  "The only thing recursive here is the bugs.",
  "This code would make Dijkstra roll in his grave.",
  "Did you learn programming from a captcha?",
  "Your code has the elegance of a Walmart bag in a hurricane.",
  "This is why we can't have nice things in production.",
  "I've seen better error handling in a lottery script.",
  "Your code is the human centipede of software - one giant hack connected to another.",
  "This would fail even in a coding interview for interns.",
  "Your functions are longer than my grocery list.",
  "This code makes me want to switch to PHP.",
  "The complexity of this is inversely proportional to its usefulness.",
  "Your naming convention is inconsistent at best.",
  "This is a masterclass in how not to structure data.",
  "I've seen better type safety in a JSON blob.",
  "Your code uses more any than TypeScript's type system intended.",
  "This is the coding equivalent of painting over rust.",
  "Your loop has more conditions than my relationship status.",
  "This would crash in production before the deploy finishes.",
  "Your async code has all the elegance of synchronous spaghetti.",
  "I've seen better null checks in a game of Minesweeper.",
  "Your code is why people think programmers are weird.",
  "This would make your CS professor weep.",
  "Your git history looks like a cry for help.",
  "This is what happens when you skip the code review.",
  "I've seen better encapsulation in a global variable.",
  "Your class has more responsibilities than the US government.",
  "This is the dictionary definition of technical debt.",
  "Your code would fail a basic code quality scan.",
  "This has 'born in production' written all over it.",
  "Your design pattern usage is creative at best.",
  "I've seen better error handling in a beginner tutorial.",
  "This code would make Kent Beck quit coding.",
  "Your array manipulation is a tragedy in 3 acts.",
  "This is why we need pair programming.",
  "Your variable scope is larger than my attention span.",
  "This is a monument to copy-paste programming.",
  "The indentation alone is a war crime.",
  "Your code has the maintainability of a house of cards.",
  "This would make any senior dev resign on the spot.",
  "Your API design is an insult to REST.",
  "I've seen better security in a toddler's diary.",
  "This would fail any reasonable linting rule.",
  "Your memory management is a leak waiting to happen.",
  "This is what happens when you don't write tests.",
  "Your code style is a perfect circle of bad decisions.",
  "I've seen better documentation in ancient hieroglyphics.",
  "This is a debugging nightmare wrapped in a cryptic variable name.",
  "Your code review comments could fill a novel.",
  "This is the code equivalent of a text from an ex at 2am.",
  "Your logging is more verbose than a Twitter thread.",
  "I've seen better performance in a slideshow presentation.",
  "This is what legacy code looks like on day one.",
  "Your function is doing things it shouldn't.",
  "This would fail in any self-respecting CI pipeline.",
  "Your code has the reusability of a一次性筷子.",
  "I've seen better error messages in captchas.",
  "This is the perfect way to make future you suffer.",
  "Your variable naming makes me question your sanity.",
  "This code needs therapy, not a code review.",
  "Your recursion depth would make Stack Overflow proud.",
  "This is a textbook example of code smell.",
  "I've seen better imports in a botched migration.",
  "Your code has the clarity of fog in London.",
  "This would be funny if it weren't in production.",
  "Your dependencies are more tangled than earbuds in a pocket.",
  "This is what happens when you skip the requirements gathering.",
  "Your solution is more complicated than the problem.",
  "I've seen better typing in a dynamically typed language.",
  "This would make any linter commit seppuku.",
  "Your code has the structure of a Jenga tower.",
  "This is why we can't have nice deploys.",
  "Your comments explain what the code should do, not what it does.",
  "This is a crime against software engineering.",
  "I've seen better code in a CAPTCHA.",
  "Your git blame would make interesting reading.",
  "This code has all the subtlety of a sledgehammer.",
  "Your abstraction layers are thicker than Earth's atmosphere.",
  "This would make any debugger cry.",
  "Your state management is a state of emergency.",
  "I've seen better architecture in a Rube Goldberg machine.",
  "This is the kind of code that keeps me employed.",
  "Your error handling is an exercise in denial.",
  "This would make any database admin weep.",
  "Your code uses the wrong tool for every job.",
  "This is a tutorial on how not to solve problems.",
];

const CODE_SAMPLES = [
  `function ${faker.lorem.word()}() {
  ${faker.lorem.sentence()};
  ${faker.lorem.sentence()};
  ${faker.lorem.sentence()};
}`,
  `const ${faker.lorem.word()} = {
  ${faker.lorem.word()}: ${faker.lorem.word()},
  ${faker.lorem.word()}: ${faker.lorem.word()},
  ${faker.lorem.word()}: ${faker.lorem.word()},
};`,
  `async function ${faker.lorem.word()}() {
  const ${faker.lorem.word()} = await ${faker.lorem.word()}();
  const ${faker.lorem.word()} = ${faker.lorem.word()}(${faker.lorem.word()});
  return ${faker.lorem.word()};
}`,
  `for (let i = 0; i < ${faker.number.int({ min: 10, max: 100 })}; i++) {
  console.log(i);
  if (i % 10 === 0) {
    ${faker.lorem.sentence()};
  }
}`,
  `const ${faker.helpers.arrayElement(['arr', 'list', 'data'])} = [
  ${Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => `${faker.lorem.word()}: ${faker.number.int({ min: 1, max: 100 })}`).join(',\n  ')},
];`,
  `function calculate${faker.helpers.arrayElement(['Total', 'Sum', 'Average'])}(items) {
  let result = 0;
  for (let i = 0; i < items.length; i++) {
    result += items[i].price;
  }
  return result;
}`,
  `class ${faker.helpers.arrayElement(['User', 'Product', 'Order'])}Service {
  constructor() {
    this.${faker.lorem.word()} = null;
    this.${faker.lorem.word()} = [];
  }
  
  ${faker.lorem.word()}() {
    ${faker.lorem.sentence()};
  }
}`,
  `const handler = (event) => {
  if (event.target.value) {
    this.setState(event.target.value);
  }
  ${faker.lorem.sentence()};
};`,
  `try {
  const data = await fetch('/api/${faker.lorem.word()}');
  const result = await data.json();
  console.log(result);
} catch (error) {
  console.error('Error:', error);
}`,
  `function ${faker.lorem.word()}(items) {
  return items
    .filter(x => x.${faker.lorem.word()})
    .map(x => ({
      ...x,
      ${faker.lorem.word()}: ${faker.lorem.word()}(x)
    }))
    .reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
}`,
];

async function seed() {
  console.log("🌱 Seeding database...");

  for (let i = 0; i < 100; i++) {
    const language = faker.helpers.arrayElement(LANGUAGES);
    const code = faker.helpers.arrayElement(CODE_SAMPLES);
    const isRoastMode = faker.datatype.boolean();
    const score = (Math.random() * 10).toFixed(1);
    const roastText = isRoastMode
      ? faker.helpers.arrayElement(ROAST_TEMPLATES)
      : `Code analysis: ${language} code detected. Consider improving readability.`;

    await db.execute(
      sql`INSERT INTO submissions (code, language, "isRoastMode", score, "roastText")
          VALUES (${code}, ${language}, ${isRoastMode}, ${score}, ${roastText})`
    );
  }

  const result = await db.execute(
    sql`SELECT COUNT(*) as count FROM submissions`
  ) as unknown as [{ count: string }];
  console.log(`✅ Seed complete! Total submissions: ${result[0].count}`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });