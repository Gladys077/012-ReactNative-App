import { useTheme } from "@/context/ThemeContext";
import { Text, View } from "react-native";
import { FontSizes } from "../../constants/Tokens";
import { Estrella0, Estrella100, Estrella50 } from "../icons";

interface EstrellaReputacionProps {
  rating: number; // De 0 a 5
  ratingCount: number;
  size?: number;
  showHalfStars?: boolean;
}

export default function EstrellaReputacion({
  rating = 0,
  ratingCount = 0,
  size = 16,
  showHalfStars = true,
}: EstrellaReputacionProps) {
  const { colors, fonts } = useTheme();
  const maxStars = 5;

  // Aseguramos que el rating esté entre 0 y 5
  const clampedRating = Math.max(0, Math.min(5, rating));

  const starColor = colors.brandSeller;

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      const diff = clampedRating - (i - 1);

      if (diff >= 1) {
        // Estrella completa
        stars.push(
          <Estrella100
            key={i}
            width={size}
            height={size}
            fill={starColor}
            stroke={starColor}
          />,
        );
      } else if (diff > 0 && diff < 1 && showHalfStars) {
        // Media estrella
        stars.push(
          <Estrella50
            key={i}
            width={size}
            height={size}
            fill={starColor}
            stroke={starColor}
          />,
        );
      } else {
        // Estrella vacía
        stars.push(
          <Estrella0
            key={i}
            width={size}
            height={size}
            fill={starColor}
            stroke={starColor}
          />,
        );
      }
    }

    return stars;
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      {renderStars()}
      {ratingCount !== undefined &&
        (ratingCount === 0 ? (
          <Text
            style={{
              fontSize: FontSizes.sm,
              fontFamily: fonts.robotoRegular,
              color: colors.textMuted,
            }}
          >
            Sin calif.
          </Text>
        ) : (
          <>
            <Text
              style={{
                fontSize: FontSizes.sm,
                fontFamily: fonts.robotoMedium,
                color: colors.textDefault,
              }}
            >
              {rating.toFixed(1)}
            </Text>
            <Text
              style={{
                fontSize: FontSizes.sm,
                fontFamily: fonts.robotoRegular,
                color: colors.textMuted,
              }}
            >
              ({ratingCount})
            </Text>
          </>
        ))}
    </View>
  );
}
