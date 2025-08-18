import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const categories = [
  { value: "woman_man", label: "Donna cerca Uomo 👩❤️👨", emoji: "👩❤️👨" },
  { value: "man_woman", label: "Uomo cerca Donna 👨❤️👩", emoji: "👨❤️👩" },
  { value: "couples", label: "Coppie 👫", emoji: "👫" },
  { value: "man_man", label: "Uomo cerca Uomo 👨❤️👨", emoji: "👨❤️👨" },
  { value: "woman_woman", label: "Donna cerca Donna 👩❤️👩", emoji: "👩❤️👩" },
];

const cities = [
  "Roma", "Milano", "Napoli", "Torino", "Palermo", 
  "Genova", "Bologna", "Firenze", "Bari", "Catania"
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  const handleSearch = () => {
    // Implementeremo la ricerca vera più    console.log({
      category: selectedCategory,
      city: selectedCity,
      query: searchQuery
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">
            Incontri Birichini 🔥
          </h1>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Categoria</label>
                <Select onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tutte le categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Città</label>
                <Select onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tutte le città" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutte le città</SelectItem>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Parole chiave</label>
                <Input 
                  placeholder="Cosa cerchi?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Button 
              className="w-full bg-pink-600 hover:bg-pink-700"
              onClick={handleSearch}
            >
              <Search className="mr-2 h-4 w-4" />
              Cerca annunci
            </Button>

            <div className="flex justify-center space-x-4 pt-4">
              {!session ? (
                <>
                  <Link to="/auth">
                    <Button variant="outline">Accedi</Button>
                  </Link>
                  <Link to="/auth">
                    <Button>Registrati</Button>
                  </Link>
                </>
              ) : (
                <Link to="/dashboard">
                  <Button>La tua Dashboard</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;