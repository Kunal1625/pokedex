import React, { useEffect, useState } from "react";
import PokemonThumbnail from "./Components/PokemonThumbnail";

function App() {
const [allPokemons, setAllPokemons] = useState([]);
const [loadPoke, setLoadPoke] = useState(
	"https://pokeapi.co/api/v2/pokemon?limit=10"
);
const getAllPokemons = async () => {
	const res = await fetch(loadPoke);
	const data = await res.json();
	setLoadPoke(data.next);

	function createPokemonObject(result) {
	result.forEach(async (pokemon) => {
		const res = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
		);
		const data = await res.json();
		setAllPokemons((currentList) => [...currentList, data]);
	});
	}
	createPokemonObject(data.results);
	await console.log(allPokemons);
};
useEffect(() => {
	getAllPokemons();
}, []);

return (
	<div className="app-container">
	<h1>Pokemon Kingdom .</h1>
  <div className="search-bar">
    <input type="text" placeholder="Search.."></input>
  </div>
  <div className="type">
    <input type="text" placeholder="Type.."></input>
  </div>
  

	<div className="pokemon-container">
		<div className="all-container">
		{allPokemons.map((pokemon, index) => (
			<PokemonThumbnail
			id={pokemon.id}
			name={pokemon.name}
			image=
	{pokemon.sprites.other.dream_world.front_default}
			type={pokemon.types[0].type.name}
			/>
		))}
		</div>
		<button className="load-more"
		onClick={() => getAllPokemons()}>
		More Pokemons
		</button>
	</div>
	</div>
);
}

export default App;
