const express = require('express');
const multer = require('multer');

express()
  .use( 
    ( req, res, next ) => 
    { res.header("Access-Control-Allow-Origin", "*")
    ; res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    ; next()
    }
  )
  .get
  ( '/'
  , ( req, res ) => res.send( { message: 'upload here' } )
  )
  .post
  ( '/'
  , multer( { dest: './build/uploads/' } ) .any()
  , ( req, res ) => res.send( { message: 'ok', files:req.files } )
  )
  .listen
  ( 8000
  , () => console.log(`upload server listening on localhost:8000`) 
  )