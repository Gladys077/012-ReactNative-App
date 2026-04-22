import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { TipsButton, TipsSheet } from "../../components/TipsBottomSheet";
import MenuVendedor, {
  TabVendedorMenu,
} from "../../components/vendedor/MenuVendedor/MenuVendedor";
import PedidosEntregados from "../../components/vendedor/MenuVendedor/PedidosEntregados";
import PedidosNuevos from "../../components/vendedor/MenuVendedor/PedidosNuevos";
import PedidosPendientes from "../../components/vendedor/MenuVendedor/PedidosPendientes";
import { useAuthContext } from "../../context/AuthContext";
import { useOrders } from "../../context/OrdersContext";
import { estadoSistemaATabVendedor } from "../../types/pedidos";

const HomeVendedor = () => {
  const { colors, fonts } = useTheme();
  const { pedidos } = useOrders();
  const { switchRole } = useAuthContext();

  const [tabActivo, setTabActivo] = useState<TabVendedorMenu>("pedidos");
  const [tipsOpen, setTipsOpen] = useState(false);

  // ─── Filtros por tab ──────────────────────────────────────────────────────
  const pedidosNuevos = pedidos.filter(
    (p) => estadoSistemaATabVendedor[p.estadoSistema] === "pedidos",
  );
  const pedidosPendientes = pedidos.filter(
    (p) => estadoSistemaATabVendedor[p.estadoSistema] === "pendientes",
  );
  const pedidosEntregados = pedidos.filter(
    (p) => estadoSistemaATabVendedor[p.estadoSistema] === "entregados",
  );

  // ─── Render tab activo ────────────────────────────────────────────────────
  const renderTab = () => {
    switch (tabActivo) {
      case "pedidos":
        return <PedidosNuevos pedidos={pedidosNuevos} />;
      case "pendientes":
        return <PedidosPendientes pedidos={pedidosPendientes} />;
      case "entregados":
        return <PedidosEntregados pedidos={pedidosEntregados} />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Menú de 3 tabs */}
      <MenuVendedor
        tabActivo={tabActivo}
        onTabChange={setTabActivo}
        badgePedidos={pedidosNuevos.length}
        badgePendientes={pedidosPendientes.length}
        badgeEntregados={pedidosEntregados.length}
      />

      {/* Contenido del tab activo */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: Spacing.xl,
          paddingBottom: Spacing.lg,
        }}
      >
        {renderTab()}
      </View>

      {/* Footer fijo */}
      <View
        style={{
          paddingHorizontal: Spacing.xxl,
          paddingBottom: Spacing.md,
          gap: Spacing.sm,
          // paddingHorizontal: Spacing.xl,
          // paddingVertical: Spacing.lg,
        }}
      >
        <TipsButton
          isOpen={tipsOpen}
          onPress={() => setTipsOpen((prev) => !prev)}
        />
        <View style={{ alignItems: "center", marginVertical: 8 }}>
          <Text
            style={{
              fontSize: FontSizes.base,
              color: colors.textMuted,
              textAlign: "center",
            }}
          >
            ¿Deseas comprar?{"  "}
            <Text
              onPress={() => {
                switchRole("buyer");
                router.push("/comprador/estadoPedido");
              }}
              style={{
                color: colors.brandBuyer,
                textDecorationLine: "underline",
                fontFamily: fonts.robotoRegular,
              }}
            >
              Sí, quiero comprar
            </Text>
          </Text>
        </View>
      </View>

      <TipsSheet isOpen={tipsOpen} onClose={() => setTipsOpen(false)} />
    </View>
  );
};

export default HomeVendedor;
