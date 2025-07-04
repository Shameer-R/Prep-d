export default function FindMealsPage({ handleMealGeneration }) {

  const onClick = () => {
    handleMealGeneration()
      .then(data => {
        console.log("Fetched meals:", data);
      })
      .catch(err => {
        console.error("Error fetching meals:", err);
      });
  };

  return(
    <>
      <h1>Find Groceries:</h1>
      <button className="generate-button" onClick={onClick}>Generate Recipes</button>
    </>
  );
}