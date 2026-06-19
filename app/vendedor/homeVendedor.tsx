import { useTheme } from "@/context/ThemeContext";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, View } from "react-native";
import { TipsSheet } from "../../components/subcomponentes/TipsBottomSheet";
import UndoToast from "../../components/subcomponentes/UndoToast";
import TipsFAB from "../../components/UI/FAB";
import ComprobanteViewerModal from "../../components/vendedor/ComprobanteViewerModal";
import MenuVendedor, {
  TabVendedorMenu,
} from "../../components/vendedor/MenuVendedor/MenuVendedor";
import PedidosEntregados from "../../components/vendedor/MenuVendedor/PedidosEntregados";
import PedidosNuevos from "../../components/vendedor/MenuVendedor/PedidosNuevos";
import PedidosPendientes from "../../components/vendedor/MenuVendedor/PedidosPendientes";
import { SubTabPendiente } from "../../components/vendedor/MenuVendedor/SubMenuPendientes";
import { Spacing } from "../../constants/Tokens";
import { useAuthContext } from "../../context/AuthContext";
import { useBottomSheetVerPedido } from "../../context/BottomSheetVerPedidoContext";
import { useOrders } from "../../context/OrdersContext";
import { useUndoToast } from "../../hooks/useUndoToast";
import { Comprobante, estadoSistemaATabVendedor } from "../../types/pedidos";

const HomeVendedor = () => {
  const { colors } = useTheme();
  const { isVisible, openBottomSheetVerPedido, closeBottomSheetVerPedido } =
    useBottomSheetVerPedido();

  const { pedidos } = useOrders();
  // const pathname = usePathname();

  const { switchRole } = useAuthContext();

  const { toast, mostrar, cancelar, cerrar } = useUndoToast();
  const [pendienteId, setPendienteId] = useState<string | number | null>(null);

  const [tabActivo, setTabActivo] = useState<TabVendedorMenu>("pedidos");
  const [tipsOpen, setTipsOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      switchRole("seller");
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        // Se ejecuta cuando la screen PIERDE el foco (cuando navegamos a otra)
        closeBottomSheetVerPedido();
      };
    }, [closeBottomSheetVerPedido]),
  );

  const [subTabPendienteActivo, setSubTabPendienteActivo] =
    useState<SubTabPendiente | null>(null);

  // ─── Handlers ──────────────────────────────────────────────────────
  const handleTabChange = (tab: TabVendedorMenu) => {
    closeBottomSheetVerPedido();
    if (tab === "pendientes" && tabActivo === "pendientes") {
      // Ya estamos en pendientes → volver al submenú
      setSubTabPendienteActivo(null);
      return;
    }
    setTabActivo(tab);
    if (tab === "pendientes") setSubTabPendienteActivo(null);
  };

  const handleVerPedido = (id: string | number) => {
    const pedido = pedidos.find((p) => p.id === id);
    if (!pedido) return;

    if (isVisible) {
      closeBottomSheetVerPedido();
      return;
    }

    openBottomSheetVerPedido({
      fechaSeleccion: pedido.fechaSeleccion,
      items: [{ id: "texto", label: pedido.textoPedido }],
      backgroundColor: colors.brandSellerSoft,
      role: "seller",
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
        return (
          <PedidosNuevos
            pedidos={pedidosNuevos}
            pendienteId={pendienteId}
            onEliminarConToast={(id, onConfirm) =>
              mostrar("Pedido eliminado", onConfirm)
            }
          />
        );
      case "pendientes":
        return (
          <PedidosPendientes
            pedidos={pedidosPendientes}
            subTabActivo={subTabPendienteActivo}
            onSubTabChange={(sub) => {
              closeBottomSheetVerPedido();
              setSubTabPendienteActivo(sub);
            }}
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
        return (
          <PedidosEntregados
            pedidos={pedidosEntregados}
            onVerPedido={handleVerPedido}
            onVerNota={handleVerNota}
            onCalificar={closeBottomSheetVerPedido}
          />
        );
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
      {tabActivo === "pedidos" && (
        <View
          pointerEvents="box-none"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            borderRadius: "50",
            paddingVertical: Spacing.lg,
            marginRight: Spacing.md,
          }}
        >
          <TipsFAB
            section="seller"
            onPress={() => setTipsOpen((prev) => !prev)}
            style={{ marginVertical: 4 }}
          />
        </View>
      )}

      {tabActivo === "pedidos" && (
        <TipsSheet isOpen={tipsOpen} onClose={() => setTipsOpen(false)} />
      )}

      <UndoToast
        visible={toast.visible}
        mensaje={toast.mensaje}
        onCancelar={() => {
          setPendienteId(null);
          cancelar();
        }}
        onCerrar={cerrar}
      />
    </View>
  );
};

export default HomeVendedor;
