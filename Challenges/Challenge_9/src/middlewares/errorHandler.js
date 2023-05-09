const errorHandler = (err, req, res, next) => {

  console.log(err.message);

  if(err.message === 'Not authenticated') return res.redirect('/login');

  if(err.message === 'Not authorized') return res.redirect('/home');

  if(err.message) return res.status(400).json({ Error: err.message });

  res.status(500).json({ Error: 'Internal Server Error' });
};

export default errorHandler;
