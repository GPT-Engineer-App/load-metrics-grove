import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Paw } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CatBreed = ({ name, description, rating, onRatingChange }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="flex items-center">
            <Paw className="w-6 h-6 mr-2 text-purple-500" />
            {name}
          </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
                  star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
                onClick={() => onRatingChange(star)}
              />
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const Index = () => {
  const [catBreeds, setCatBreeds] = useState([
    { name: "Siamese", description: "Known for their distinctive color points and blue eyes.", rating: 0 },
    { name: "Maine Coon", description: "One of the largest domestic cat breeds, known for their intelligence and playful personality.", rating: 0 },
    { name: "Persian", description: "Recognized for their long fur and flat faces.", rating: 0 },
    { name: "Bengal", description: "Known for their wild appearance and energetic personality.", rating: 0 },
    { name: "Sphynx", description: "Distinctive for their lack of fur and wrinkled skin.", rating: 0 },
  ]);

  const [catFact, setCatFact] = useState("");

  useEffect(() => {
    fetchCatFact();
  }, []);

  const fetchCatFact = async () => {
    try {
      const response = await fetch("https://catfact.ninja/fact");
      const data = await response.json();
      setCatFact(data.fact);
    } catch (error) {
      console.error("Error fetching cat fact:", error);
    }
  };

  const handleRatingChange = (index, newRating) => {
    const updatedBreeds = [...catBreeds];
    updatedBreeds[index].rating = newRating;
    setCatBreeds(updatedBreeds);
  };

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold mb-6 text-center text-purple-800"
        >
          All About Cats
        </motion.h1>
        
        <Carousel className="mb-8">
          <CarouselContent>
            {catImages.map((src, index) => (
              <CarouselItem key={index}>
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={src}
                  alt={`Cat ${index + 1}`}
                  className="mx-auto object-cover w-full h-[400px] rounded-lg shadow-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="mb-8 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-700">Did You Know?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 italic">{catFact}</p>
              <Button onClick={fetchCatFact} className="mt-4 bg-purple-600 hover:bg-purple-700">
                Get Another Fact
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="about" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About Cats</TabsTrigger>
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
            <TabsTrigger value="care">Cat Care</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>About Cats</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
                    independence, agility, and affectionate nature. Cats come in various breeds, each with its unique
                    characteristics and personalities. These graceful animals have captured the hearts of millions around the world
                    with their playful antics and soothing purrs.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle>Popular Cat Breeds</CardTitle>
              </CardHeader>
              <CardContent>
                {catBreeds.map((breed, index) => (
                  <CatBreed
                    key={index}
                    name={breed.name}
                    description={breed.description}
                    rating={breed.rating}
                    onRatingChange={(newRating) => handleRatingChange(index, newRating)}
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="care">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Cat Care Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-none space-y-4">
                    {[
                      "Provide a balanced diet suitable for your cat's age and health condition",
                      "Ensure fresh water is always available",
                      "Regular grooming to keep their coat healthy",
                      "Schedule regular check-ups with a veterinarian",
                      "Provide mental stimulation with toys and play sessions",
                      "Create a safe and comfortable living environment",
                      "Maintain a clean litter box",
                    ].map((tip, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-lg text-gray-700"
                      >
                        <Paw className="w-6 h-6 mr-2 text-purple-500" />
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
