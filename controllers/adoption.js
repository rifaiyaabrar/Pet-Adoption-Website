const express = require('express');
const Pet = require('../models/pet');
const User = require('../models/user');

let router = express.Router();

router.get('/adoptionApprovals', async (req, res) => {
	if (!req.session.username) return res.redirect('/signin');

	const pets = await Pet.find({ username: req.session.username });
	const petsWithUsers = [];

	for (let i = 0; i < pets.length; i++) {
		const pet = pets[i];
		let request = [];
		request.push(
			await Promise.all(
				pet.request.map(async (username) => {
					const { _id: id, name, email, phone, nid } = await User.findOne({ username }).lean();

					return { id: id.toString(), username, name, email, phone, nid };
				})
			)
		);

		petsWithUsers.push({
			id: pets[i].id,
			username: pets[i].username,
			pet_name: pets[i].pet_name,
			pet_image: pets[i].pet_image,
			description: pets[i].description,
			catagory: pets[i].catagory,
			status: pets[i].status,
			request: request[0]
		});
	}
	const donated = await Pet.find({ username: req.session.username });

	return res.render('pages/adoptionApprovals', {
		username: req.session.username,
		is_admin: false,
		pet: petsWithUsers,
		donated
	});
});
router.get('/adoption-accept/:id/:username', async (req, res) => {
	if (!req.session.username) return res.redirect('/signin');
	const { id, username } = req.params;

	await Pet.findByIdAndUpdate(id, { donated_to: username, request: [], status: 'Donated' });

	return res.redirect('/adoptionApprovals');
});
router.get('/adoption-reject/:id/:username', async (req, res) => {
	if (!req.session.username) return res.redirect('/signin');
	console.log(req.params);
	const { id, username } = req.params;

	await Pet.findByIdAndUpdate(id, { $pull: { request: username } });

	return res.redirect('/adoptionApprovals');
});
router.get('/adoption-request/:id', async (req, res) => {
	if (!req.session.username) return res.redirect('/signin');

	const { id } = req.params;

	await Pet.findByIdAndUpdate(id, { $push: { request: req.session.username } });

	return res.redirect('/donationApprovals');
});
router.get('/adoption-cancel/:id', async (req, res) => {
	if (!req.session.username) return res.redirect('/signin');

	const { id } = req.params;

	await Pet.findByIdAndUpdate(id, { $pull: { request: req.session.username } });

	return res.redirect('/accountDetails');
});
router.get('/applicationVerifications', (req, res) => {
	if (!req.session.username) return res.redirect('/signin');

	return res.render('pages/donationVerifications', { username: req.session.username, is_admin: true });
});
//
//
//
router.get('/donation-cancel/:id', async (req, res) => {
	if (!req.session.username) return res.redirect('/signin');

	let pet = await Pet.findByIdAndDelete(req.params.id);

	return res.redirect('/accountDetails');
});
router.get('/donationVerifications', async (req, res) => {
	if (!req.session.username) return res.redirect('/signin');

	let pet = await Pet.find({ status: 'Pending' });
	pet = await Promise.all(
		pet.map(async ({ id, pet_name, username, category }) => {
			const { email, phone, nid } = await User.findOne({ username });

			return {
				id,
				pet_name,
				username,
				email,
				phone,
				nid,
				category
			};
		})
	);

	return res.render('pages/donationVerifications', { username: req.session.username, is_admin: true, pet });
});
router.get('/donationVerifications-approve/:id', async (req, res) => {
	if (!req.session.username) return res.redirect('/signin');

	let pet = await Pet.findByIdAndUpdate(req.params.id, { status: 'Approved' });

	return res.redirect('/donationVerifications');
});
router.get('/donationVerifications-reject/:id', async (req, res) => {
	if (!req.session.username) return res.redirect('/signin');

	let pet = await Pet.findByIdAndUpdate(req.params.id, { status: 'Rejected' });

	return res.redirect('/donationVerifications');
});
module.exports = router;
