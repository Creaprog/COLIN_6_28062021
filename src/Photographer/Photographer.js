import React from 'react';
import { useParams } from 'react-router-dom';

//TODO : Afficher le profile du photographe.
export default function Photographer() {
  const { id } = useParams();
  return (
    <>
      <h1>value : {id}</h1>
    </>
  );
}
