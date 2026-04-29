import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { TipsButton, TipsSheet } from "../../components/TipsBottomSheet";
import ComprobanteViewerModal from "../../components/vendedor/ComprobanteViewerModal";
import MenuVendedor, {
  TabVendedorMenu,
} from "../../components/vendedor/MenuVendedor/MenuVendedor";
import PedidosEntregados from "../../components/vendedor/MenuVendedor/PedidosEntregados";
import PedidosNuevos from "../../components/vendedor/MenuVendedor/PedidosNuevos";
import PedidosPendientes from "../../components/vendedor/MenuVendedor/PedidosPendientes";
import { SubTabPendiente } from "../../components/vendedor/MenuVendedor/SubMenuPendientes";
import { useAuthContext } from "../../context/AuthContext";
import { useBottomSheetVerPedido } from "../../context/BottomSheetVerPedidoContext";
import { useOrders } from "../../context/OrdersContext";
import { estadoSistemaATabVendedor } from "../../types/pedidos";

const HomeVendedor = () => {
  const { colors, fonts } = useTheme();
  const { isVisible, openBottomSheetVerPedido, closeBottomSheetVerPedido } =
    useBottomSheetVerPedido();

  const { pedidos } = useOrders();
  const { switchRole } = useAuthContext();

  const [tabActivo, setTabActivo] = useState<TabVendedorMenu>("pedidos");
  const [tipsOpen, setTipsOpen] = useState(false);

  const [subTabPendienteActivo, setSubTabPendienteActivo] =
    useState<SubTabPendiente | null>(null);

  // ─── Handlers ──────────────────────────────────────────────────────
  const handleTabChange = (tab: TabVendedorMenu) => {
    if (tab === "pendientes" && tabActivo === "pendientes") {
      // Ya estamos en pendientes → volver al submenú
      setSubTabPendienteActivo(null);
      return;
    }
    setTabActivo(tab);
  };

  const handleVerPedido = (id: string | number) => {
    if (isVisible) {
      closeBottomSheetVerPedido();
      return;
    }
    const pedido = pedidosPendientes.find((p) => p.id === id);
    if (!pedido) return;
    openBottomSheetVerPedido({
      fechaSeleccion: pedido.fechaSeleccion,
      items: [{ id: "texto", label: pedido.textoPedido }],
      backgroundColor: colors.brandSellerSoft,
    });
  };

  const handleVerNota = (nota: string) => {
    Alert.alert("Nota del vendedor", nota);
  };

  const [comprobanteModal, setComprobanteModal] = useState<{
    visible: boolean;
    comprobantes: Comprobante[];
  }>({ visible: false, comprobantes: [] });

  const handleVerComprobante = (id: string | number) => {
    const pedido = pedidosPendientes.find((p) => p.id === id);
    if (!pedido?.comprobantes?.length) return;
    setComprobanteModal({ visible: true, comprobantes: pedido.comprobantes });
  };

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
        return (
          <PedidosPendientes
            pedidos={pedidosPendientes}
            subTabActivo={subTabPendienteActivo}
            onSubTabChange={setSubTabPendienteActivo}
            onVerPedido={handleVerPedido}
            onVerNota={handleVerNota}
            onVerComprobante={handleVerComprobante}
            onPagoConfirmado={(id) => console.log("pago confirmado", id)}
            onPagoRechazado={(id) => console.log("pago rechazado", id)}
            onMensaje={(id) => console.log("mensaje", id)}
            onListoParaEnviar={(id) => console.log("listo para enviar", id)}
            onEntregado={(id) => console.log("entregado", id)}
          />
        );
      case "entregados":
        return <PedidosEntregados pedidos={pedidosEntregados} />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ComprobanteViewerModal
        visible={comprobanteModal.visible}
        comprobantes={comprobanteModal.comprobantes}
        onClose={() =>
          setComprobanteModal({ visible: false, comprobantes: [] })
        }
      />
      {/* Menú de 3 tabs */}
      <MenuVendedor
        tabActivo={tabActivo}
        onTabChange={handleTabChange}
        badgePedidos={pedidosNuevos.length}
        badgePendientes={pedidosPendientes.length}
        badgeEntregados={pedidosEntregados.length}
      />

      {/* Contenido del tab activo */}
      <View
        style={{
          flex: 1,
        }}
      >
        {renderTab()}
      </View>

      {/* Footer fijo */}
      <View
        style={{
          paddingHorizontal: Spacing.xxl,
          gap: Spacing.sm,
        }}
      >
        {tabActivo === "pedidos" && (
          <TipsButton
            isOpen={tipsOpen}
            onPress={() => setTipsOpen((prev) => !prev)}
          />
        )}
        {tabActivo === "pedidos" && (
          <View style={{ alignItems: "center", marginVertical: 4 }}>
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
        )}
      </View>

      {tabActivo === "pedidos" && (
        <TipsSheet isOpen={tipsOpen} onClose={() => setTipsOpen(false)} />
      )}
    </View>
  );
};

export default HomeVendedor;
