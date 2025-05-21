"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type ProductMinimal = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity?: number;
};

type CartWishlistContextType = {
  cart: ProductMinimal[];
  wishlist: ProductMinimal[];
  addToCart: (product: ProductMinimal) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: ProductMinimal) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  isInCart: (id: string) => boolean;
};

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(
  undefined
);

function getLocalStorageData<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return defaultValue;
    return JSON.parse(saved) as T;
  } catch {
    return defaultValue;
  }
}

export function CartWishlistProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage synchronously on first render
  const [cart, setCart] = useState<ProductMinimal[]>(() =>
    getLocalStorageData<ProductMinimal[]>("cart", [])
  );
  const [wishlist, setWishlist] = useState<ProductMinimal[]>(() =>
    getLocalStorageData<ProductMinimal[]>("wishlist", [])
  );

  // Sync localStorage on changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // CART HANDLERS

  function addToCart(product: ProductMinimal) {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity ?? 1) + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function updateCartQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }

  function clearCart() {
    setCart([]);
  }

  // WISHLIST HANDLERS

  function addToWishlist(product: ProductMinimal) {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev; // avoid duplicates
      return [...prev, product];
    });
  }

  function removeFromWishlist(id: string) {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }

  function isInWishlist(id: string) {
    return wishlist.some((item) => item.id === id);
  }

  function isInCart(id: string) {
    return cart.some((item) => item.id === id);
  }

  return (
    <CartWishlistContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        isInCart,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
}

export function useCartWishlist() {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error(
      "useCartWishlist must be used within a CartWishlistProvider"
    );
  }
  return context;
}
