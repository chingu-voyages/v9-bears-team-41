const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('helloooooo');
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`id: ${id}`);
});

module.exports = router;
