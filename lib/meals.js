import sql from 'better-sqlite3';
import fs from 'node:fs';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare('SELECT * FROM meals').all();
}

export async function getMealDetails(slug) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const slug = slugify(meal.title, { lower: true });

  const extension = meal.image.name.split('.').pop();
  const filename = `${slug}.${extension}`;
  const stream = fs.createWriteStream('public/images/' + filename);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed with error: ' + error);
    }
  });

  meal.slug = slug;
  meal.title = xss(meal.title);
  meal.summary = xss(meal.summary);
  meal.instructions = xss(meal.instructions);
  meal.creator = xss(meal.creator);
  meal.creator_email = xss(meal.creator_email);
  meal.image = '/images/' + filename;

  return db
    .prepare(
      `INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) 
      VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)`,
    )
    .run(meal);
}
