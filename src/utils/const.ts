// Based on total number of item make items array dynamically, images from 01.jpg to ...
const items = [];
for (let i = 1; i <= 33; i++) {
    items.push({
    imageUrl: `/${i.toString().padStart(2, '0')}.jpg`,
    name: `Item ${i}`,
    id: i,
  });
}
 export default items;
