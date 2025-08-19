import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, CalendarDays } from "lucide-react";
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Link } from "react-router-dom";

export interface Listing {
  id: string;
  title: string;
  category: string;
  city: string;
  created_at: string;
  expires_at: string;
  listing_photos: { url: string; is_primary: boolean }[];
  description?: string;
}

interface ListingListItemProps {
  listing: Listing;
  showControls?: boolean;
  showExpiryDate?: boolean; // Nuova prop per controllare la data
}

export const ListingListItem = ({ listing, showControls = false, showExpiryDate = false }: ListingListItemProps) => {
  const primaryPhoto = listing.listing_photos.find(p => p.is_primary)?.url || listing.listing_photos[0]?.url;

  const dateToDisplay = showExpiryDate ? new Date(listing.expires_at) : new Date(listing.created_at);
  const prefix = showExpiryDate ? 'Scade il:' : ''; // Rimosso 'Pubblicato il:' quando showExpiryDate è false
  const dateFormat = showExpiryDate ? 'dd MMMM yyyy' : 'dd MMMM'; // Formato diverso per scadenza e pubblicazione

  const formattedDate = !isNaN(dateToDisplay.getTime()) 
    ? format(dateToDisplay, dateFormat, { locale: it }) 
    : 'N/D';

  return (
    <Card className="w-full overflow-hidden transition-shadow hover:shadow-md flex flex-col md:flex-row">
      <Link to={`/listing/${listing.id}`} className="flex-grow block hover:bg-gray-50/50">
        <div className="flex flex-col sm:flex-row">
          {primaryPhoto && (
            <div className="sm:w-1/4 lg:w-1/5 flex-shrink-0">
              <img src={primaryPhoto} alt={listing.title} className="object-cover w-full h-48 sm:h-full" />
            </div>
          )}
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">{listing.title}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="capitalize">{listing.category.replace(/-/g, ' ')}</Badge>
              <Badge variant="outline">{listing.city}</Badge>
            </div>
            <div className="mt-auto flex items-center text-xs text-gray-500">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span>{prefix} {formattedDate}</span>
            </div>
          </div>
        </div>
      </Link>
      {showControls && (
        <div className="flex-shrink-0 flex md:flex-col justify-end md:justify-center items-center gap-2 p-4 border-t md:border-t-0 md:border-l">
           <Button variant="outline" size="sm" className="w-full">
            <Pencil className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Modifica</span>
          </Button>
          <Button variant="destructive" size="sm" className="w-full">
            <Trash2 className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Elimina</span>
          </Button>
        </div>
      )}
    </Card>
  );
};