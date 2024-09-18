import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useLazyGetMealDetailQuery } from "../../store/apis/mealsApi";
import { useGetCoctailDetailQuery } from "../../store/apis/coctailApi";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  //
  const [getDetail, { data, isLoading, error }] = useLazyGetMealDetailQuery();
  // const [getDetailCoctail, { data:coctailData, isLoading, error }] = useGetCoctailDetailQuery();
  const [isExpanded, setIsExpanded] = useState(false);

  const detailMeal = data?.meals;

  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, [id, getDetail]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading meal details</div>;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto",height:'100vh' }}>
      {detailMeal ? (
        <div style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <h1 style={{ textAlign: "center" }}>{detailMeal[0].strMeal}</h1>
          <img
            src={detailMeal[0].strMealThumb}
            alt={detailMeal[0].strMeal}
            style={{ width: "100%", borderRadius: "10px", marginBottom: "20px", }}
          />
          <div style={{ marginBottom: "10px" }}>
            <strong>Instructions:</strong>
            <p>
              {isExpanded 
                ? detailMeal[0].strInstructions 
                : detailMeal[0].strInstructions.length > 200
                ? `${detailMeal[0].strInstructions.slice(0, 200)}...`
                : detailMeal[0].strInstructions
              }
            </p>
            {detailMeal[0].strInstructions.length > 200 && (
              <button
                onClick={handleToggle}
                style={{ color: "#007bff", background: "none", border: "none", cursor: "pointer", padding: "0", fontSize: "16px" }}
              >
                {isExpanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Area:</strong>
            <p>{detailMeal[0].strArea}</p>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Category:</strong>
            <p>{detailMeal[0].strCategory}</p>
          </div>
        </div>
      ) : (
        <div>Meal details not found</div>
      )}
    </div>
  );
};

export default Detail;
