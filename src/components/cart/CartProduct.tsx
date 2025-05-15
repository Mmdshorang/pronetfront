"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import imageCard from "@/assets/Srsf4Xqkzlبارگیری-۳.jpeg";
import classes from "./styles/Cart.module.css";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ProductDto } from "@/types/server/productsType";

interface Props {
  product: ProductDto;
}

export default function ProductCard({ product }: Props) {
  const [count, setCount] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1020);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {!isMobile && (
          <div className={classes.card}>
            <div className={classes.cardBox}>
              <Link key={product?.id} href={`/products/${product?.title}`}>
                <span className={classes.discount}>20%</span>
                <div className={classes.cardImgBox}>
                  <Image
                    src={imageCard}
                    alt="product"
                    className={classes.cardImg}
                    layout="intrinsic"
                    quality={75}
                  />
                </div>
                <h3 className={classes.name}>ژل ماشین ظرفشویی پروشاین</h3>
                <p className={classes.discription}>1000 میلی‌لیتر</p>
                <div className={classes.divPrise}>
                  <div className={classes.spanPrise}>145,17000 تومان</div>
                  <div className={classes.prise}>145,170 تومان</div>
                </div>
              </Link>
              {count > 0 ? (
                <div className={classes.counterBox}>
                  <button
                    className={classes.addButton}
                    onClick={() => setCount(count + 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                  <span className={classes.count}>{count}</span>
                  <span>عدد</span>
                  <button
                    className={classes.deleteButton}
                    onClick={() => setCount(count - 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  className={classes.addToCart}
                  onClick={() => setCount(1)}
                >
                  <span className={classes.addToCartText}>
                    افزودن به سبد خرید
                  </span>
                  <ShoppingCart className={classes.addToCartIcon} />
                </button>
              )}
            </div>
          </div>
      )}
      {isMobile && (
        <div>
          <div className={classes.MobileCard}>
            <div className={classes.MobileCardBox}>
              <Link key={product?.id} href={`/products/${product?.title}`}>
                <span className={classes.discount}>20%</span>
                <div className={classes.cardImgBox}>
                  <Image
                    src={imageCard}
                    alt="product"
                    className={classes.cardImgMobile}
                    layout="intrinsic"
                    quality={75}
                  />
                </div>
                <h3 className={classes.name}>ژل ماشین ظرفشویی پروشاین</h3>
                <div className={classes.divPriseMobile}>
                  <div className={classes.spanPrise}>145,170 تومان</div>
                  <div className={classes.prise}>145,170 تومان</div>
                </div>
              </Link>
              {count > 0 ? (
                <div className={classes.counterBox}>
                  <button
                    className={classes.addButtonMobile}
                    onClick={() => setCount(count + 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                  <div className={classes.count}>{count}</div>
                  <div>عدد</div>

                  <button
                    className={classes.deleteButtonMobile}
                    onClick={() => setCount(count - 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  className={classes.addToCart}
                  onClick={() => setCount(1)}
                >
                  <span className={classes.addToCartText}>
                    افزودن به سبد خرید
                  </span>
                  <ShoppingCart className={classes.addToCartIcon} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
