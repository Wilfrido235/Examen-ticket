const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('ticket/add');
});

router.post('/ticket', async (req, res) => {
    const { title,description,FechaInicio,FechaFinal} = req.body;
    const newLink = {
        title,
        description,
        FechaInicio,
        FechaFinal,
        user_id: req.user.idUsuarios
    };
    await pool.query('INSERT INTO tickets set ?', [newLink]);
    req.flash('success', 'Ticket guardado');
    res.redirect('/ticket');
});

router.get('/', isLoggedIn, async (req, res) => {
    const ticket = await pool.query('SELECT * FROM links WHERE idUsuarios = ?', [req.user.idUsuarios]);
    res.render('ticket/list', { ticket });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM tickets WHERE idUsuarios = ?', [idUsuarios]);
    req.flash('success', 'ticket Eliminado');
    res.redirect('/ticket');
});
// SIGNUP
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

// SINGIN
router.get('/signin', (req, res) => {
  res.render('auth/signin');
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

module.exports = router;