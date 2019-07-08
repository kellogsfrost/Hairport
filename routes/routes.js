// ./routes.js
// Truncated for brevity
app.post('/edit', controller.edit);
app.post('/photo', controller.photo);
// Handle submitted updates
app.post('/update', controller.update);

app.get('/', controller.index);
app.post('/destroy', controller.destroy);
app.get('/:id', controller.find);
app.post('/destroy', controller.destroy);