const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/all', async (req, res) => {
	try {
		const articles = await Article.find().sort({
			createdAt: -1
		});
		res.render('articles/all', { articles: articles });
	} catch (err) {
		res.render('articles/error');
	}
});

router.post('/all', async (req, res) => {
	try {
		const articles = await Article.find().sort({
			createdAt: -1
		});
		res.render('articles/all', { articles: articles });
	} catch (err) {
		res.render('articles/error');
	}
});

router.get('/new', (req, res) => {
	res.render('articles/new', { article: new Article() });
});

router.post('/', async (req, res) => {
	const article = new Article({
		title: req.body.title,
		content: req.body.content
	});
	try {
		const newArticle = await article.save();
		res.redirect('/articles/all');
	} catch (err) {
		res.render('articles/new', { article: article });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const article = await Article.findById(req.params.id);
		if (!article) {
			res.redirect('/articles/all');
		} else {
			res.render('articles/show', { article: article });
		}
	} catch (err) {
		res.redirect('/articles/all');
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const article = await Article.findById(req.params.id);
		await article.deleteOne();
		res.redirect('/articles/all');
	} catch (err) {
		res.redirect('/articles/all');
	}
});

router.get('/edit/:id', async (req, res) => {
	try {
		const article = await Article.findById(req.params.id);

		if (!article) {
			res.redirect('/articles/all');
		} else {
			res.render('articles/edit', { article: article });
		}
	} catch (err) {
		res.redirect('/articles/all');
	}
});

router.put('/:id', async (req, res) => {
	try {
		await Article.updateOne(
			{ _id: req.params.id },
			{
				title: req.body.title,
				content: req.body.content
			}
		);
		res.redirect('/articles/all');
	} catch (err) {
		res.redirect('articles/edit', {
			article: new Article({
				title: req.body.title,
				content: req.body.content
			})
		});
	}
});

module.exports = router;
