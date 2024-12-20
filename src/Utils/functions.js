import { fetchFilteredCategory } from "./dataFtech";
import { colornames } from "color-name-list";
import nearestColor from "nearest-color";

const colorMap = colornames.reduce((obj, color) => {
  obj[color.name] = color.hex;
  return obj;
}, {});
const getColorName = nearestColor.from(colorMap);
export function findColorName(hex) {
  const color = getColorName(hex);
  return color ? color.name : "Unknown Color";
}

export function formatCategoryName(category) {
    return category
        .split("-")
        .map((word, index) =>
            index === 0
                ? word.toLowerCase()
                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");
}
export function formatCategoryName2(category) {
    return category
        .split(" ")
        .map((word, index) =>
            index === 0
                ? word.toLowerCase()
                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");
}
export function replaceSpacesWithDash(input) {
    return input.replace(/\s+/g, '-');
}
export function toKebabCaseCombined(input) {
  return input
      .replace(/\s+/g, '-')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
}
export function toCamelCase(input) {
  if (input.includes(' ')) {
      return input
          .toLowerCase() // Convert to lowercase
          .split(' ') // Split by spaces
          .map((word, index) => 
              index === 0 
                  ? word // Keep the first word lowercase
                  : word.charAt(0).toUpperCase() + word.slice(1) // Capitalize subsequent words
          )
          .join(''); // Join into a single string
  }
  return input; // Return the string as-is if no spaces
}



export function capitalizeFirstLetter(str) {
    if (str.length === 0) return str;
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}


export async function getLength(category,filter){
    const d = await fetchFilteredCategory(category, filter, 1, 0);
    return d.length;
}

export function createFilter({
    priceRange = null,             
    sizes = [],                    
    colors = [],                   
    category = [],                 
    gender = [],                   
    discountMin = null,            
    ratingMin = null,              
    description = "",              
    arrivalDateRange = null,       
    reviews = [],                  
    productType = [],              
    numberOfSellsMin = null,       
    images = [],                   
    imageType = "",                
    id = "",                       
  }) {
    const filter = {};
  
    // Price range filter
    if (priceRange) {
      filter.price = {};
      if (priceRange.min !== undefined) filter.price.$gte = priceRange.min;
      if (priceRange.max !== undefined) filter.price.$lte = priceRange.max;
    }
  
    // Sizes and Colors filter
    if (sizes.length > 0 || colors.length > 0) {
      filter.availablePieces = { $elemMatch: {} };
      if (sizes.length > 0) {
        filter.availablePieces.$elemMatch.size = { $in: sizes };
      }
      if (colors.length > 0) {
        filter.availablePieces.$elemMatch.color = { $in: colors };
      }
    }
  
    // Category filter
    if (category.length > 0) {
      filter.category = { $in: category };
    }
  
    // Gender filter
    if (gender.length > 0) {
      filter.gender = { $in: gender };
    }
  
    // Discount filter
    if (discountMin !== null) {
      filter.discount = { $gte: discountMin };
    }
  
    // Rating filter
    if (ratingMin !== null) {
      filter.rating = { $gte: ratingMin };
    }
  
    // Description filter
    if (description) {
      filter.description = { $regex: description, $options: "i" };
    }
  
    // Arrival date range filter
    if (arrivalDateRange) {
      filter.arrivalDate = {};
      if (arrivalDateRange.start) filter.arrivalDate.$gte = arrivalDateRange.start;
      if (arrivalDateRange.end) filter.arrivalDate.$lte = arrivalDateRange.end;
    }
  
    // Reviews filter
    if (reviews.length > 0) {
      filter.reviews = { $in: reviews };
    }
  
    // Product type filter
    if (productType.length > 0) {
      filter.productType = { $in: productType };
    }
  
    // Number of sells filter
    if (numberOfSellsMin !== null) {
      filter.numberOfSells = { $gte: numberOfSellsMin };
    }
  
    // Images filter
    if (images.length > 0) {
      filter.images = { $in: images };
    }
  
    // Image type filter
    if (imageType) {
      filter.imageType = imageType;
    }
  
    // ID filter
    if (id) {
      filter.id = id;
    }
  
    return filter;
  }
  

  
  
                         