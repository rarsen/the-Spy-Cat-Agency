import httpx
import os
from typing import List, Dict
from dotenv import load_dotenv

load_dotenv()

THE_CAT_API_URL = os.getenv("THE_CAT_API_URL", "https://api.thecatapi.com/v1/breeds")


async def get_cat_breeds() -> List[Dict]:
    """Fetch all cat breeds from TheCatAPI"""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(THE_CAT_API_URL)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError:
            return []


async def validate_cat_breed(breed: str) -> bool:
    """Validate if the breed exists in TheCatAPI"""
    breeds = await get_cat_breeds()
    breed_names = [cat_breed["name"].lower() for cat_breed in breeds]
    return breed.lower() in breed_names 