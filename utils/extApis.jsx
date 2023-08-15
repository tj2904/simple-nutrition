const ApiKey = process.env.NEXT_PUBLIC_API_KEY;

export async function fetchNutrients(selectedFood) {
  const handleApiCall = async () => {
    if (selectedFood && Array.isArray(selectedFood)) {
      const images = []; // Create a temporary array

      const fetchPromises = selectedFood.map((food) => {
        const foodId = food.ingredientId;
        return fetch(
          `https://api.spoonacular.com/food/ingredients/${foodId}/information?apiKey=${ApiKey}&amount=100&unit=grams`
        )
          .then((response) => response.json())
          .then((data) => {
            images.push(data.image); // Push the image
            data.nutrition.nutrients.sort(compareObjects);
            const sortedNutrients = moveZerosToEnd(data.nutrition.nutrients);
            return sortedNutrients;
          })
          .catch((error) => {
            console.log(error);
            return null;
          });
      });

      try {
        const results = await Promise.all(fetchPromises);
        const combinedArray = combineNutrientArrays(results);
        let sortedArray = combinedArray.sort(compareObjects);
        sortedArray = moveZerosToEnd(sortedArray);
        setApiResult(sortedArray);
        handleApiResult(sortedArray, images); // Pass images back to parent
        setFetchedImages(images); // Update the state with fetched images
      } catch (error) {
        console.log(error);
      }
    }
  };
}
