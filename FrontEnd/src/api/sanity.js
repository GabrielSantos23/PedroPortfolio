import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '6w8ovbuk',
  dataset: 'production',
  apiVersion: '2023-02-19',
  useCdn: true,
});

export default client;

export async function getPosts() {
  const posts = await client.fetch('*[_type == "videos"]');
  return posts;
}

export async function getContact() {
  const posts = await client.fetch('*[_type == "contact"]');
  return posts;
}
export async function getInfo() {
  const posts = await client.fetch('*[_type == "info"]');
  return posts;
}

export async function getVideoInfo(id) {
  const query = `*[ _type == "videos" && _id == "${id}" ][0]`;
  const video = await client.fetch(query);
  return video;
}
