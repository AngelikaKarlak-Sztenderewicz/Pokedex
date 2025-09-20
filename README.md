# Pokemon Site

**Pokemon Site** is a project that allows you to:

- Viewing Pokémon cards and rankings
- Battling in the arena
- Adding new Pokémon
- Adding and editing Pokémon

## Installation

1. Clone the repository

git clone https://github.com/AngelikaKarlak-Sztenderewicz/Pokedex

2. Install dependencies:

npm install

3. Run the project:

**BackEnd**

npx json-server --watch db.json --port 5174

**FrontEnd**

npm run dev

## Usage

1. Open the application in your browser
2. Register/Log in
3. In the **main menu**:

Click on a Pokémon card to see detailed information and action icons:

🗡️ – add the Pokémon to the arena
❤️ – add the Pokémon to your favorites
Next to the sword icon, you can see the number of Pokémon in the arena

4. The **favorites** page allows you to browse your favorite Pokémon.
5. The **arena** page allows you to battle two Pokémon. Click the **Fight** button once all slots are filled.
6. The **ranking** allows you to sort Pokémon by category: height, weight, experience, fight won – sorted from highest to lowest.
7. The **edit** page allows you to edit Pokémon data and add new Pokémon. All fields in the Create Pokémon dialog are required.
8. The **logout** button logs you out. Upon logging back in, all data is restored.
