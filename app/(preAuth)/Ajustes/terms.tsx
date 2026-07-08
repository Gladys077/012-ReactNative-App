import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";

type Section = {
  title: string;
  content: string[];
};

export default function TermsScreen() {
  const { colors } = useTheme();

  const sections: Section[] = [
    {
      title: "1. Introducción",
      content: [
        "La Plataforma actúa como una herramienta tecnológica de intermediación entre compradores y vendedores/prestadores de servicios, permitiendo solicitar presupuestos, coordinar pedidos y gestionar distintas modalidades de pago disponibles dentro de la aplicación.",
        "La Plataforma facilita el contacto entre las partes, pero no participa como vendedor directo ni garantiza resultados comerciales específicos.",
      ],
    },
    {
      title: "2. Aceptación de los términos",
      content: [
        "Al registrarse, acceder o utilizar La Plataforma, el usuario acepta estos Términos y Condiciones, así como futuras actualizaciones que puedan realizarse.",
      ],
    },
    {
      title: "3. Registro de usuarios",
      content: [
        "Los usuarios deberán proporcionar información veraz, actualizada y completa al registrarse.",
        "El comprador será responsable de brindar correctamente los datos necesarios para la coordinación del pedido, incluyendo dirección de entrega cuando corresponda.",
        "El vendedor o prestador de servicios será responsable de brindar información clara sobre los productos o servicios ofrecidos mediante sus presupuestos.",
        "En caso de no poder cumplir total o parcialmente con lo solicitado por el comprador, el vendedor deberá aclararlo dentro de la nota o detalle del presupuesto enviado.",
      ],
    },
    {
      title: "4. Verificación de identidad y prestadores de servicios",
      content: [
        "La Plataforma podrá requerir a los usuarios que se registren como prestadores de servicios la presentación de documentación adicional, incluyendo documento de identidad, fotografía personal y, cuando corresponda, matrícula habilitante o certificación del oficio declarado.",
        "La verificación de identidad tiene como único fin reducir el riesgo de suplantación de identidad y no implica que La Plataforma avale, garantice ni certifique la idoneidad técnica, calidad ni comportamiento del prestador.",
        "El comprador reconoce que La Plataforma actúa como intermediaria y que la decisión de contratar un servicio y permitir el acceso a su domicilio u otros espacios es de su exclusiva responsabilidad.",
        "Los prestadores de servicios declaran bajo su responsabilidad que la información y documentación aportada es verídica. La falsificación o adulteración de documentos derivará en el cierre inmediato de la cuenta y podrá ser denunciada ante las autoridades competentes.",
      ],
    },
    {
      title: "5. Funcionamiento de pedidos y presupuestos",
      content: [
        "El comprador podrá solicitar presupuestos de productos o servicios a vendedores registrados dentro de la categoría correspondiente.",
        "Los vendedores podrán responder con presupuestos, aclaraciones, observaciones o limitaciones respecto del pedido solicitado.",
        "El comprador será libre de aceptar, rechazar o cancelar solicitudes mientras el pedido se encuentre dentro de los estados permitidos por La Plataforma.",
        "Una vez aceptado un presupuesto y confirmado el pago o modalidad de entrega, el pedido se considerará en proceso de cumplimiento.",
      ],
    },
    {
      title: "6. Pagos y comprobantes",
      content: [
        "El comprador será responsable de utilizar medios de pago legítimos y autorizados.",
        "Cuando el pago sea realizado mediante transferencia u otro medio digital, el comprador deberá enviar un comprobante claro, completo y legible.",
        "Un pago podrá considerarse aprobado cuando el comprobante resulte legible y el importe correspondiente haya sido efectivamente acreditado o confirmado por el vendedor.",
        "Un pago podrá ser observado cuando el comprobante no sea legible, resulte inconsistente o el importe recibido no cubra el valor acordado del pedido.",
        "La Plataforma podrá solicitar información adicional ante inconsistencias, reportes o indicios de irregularidades.",
      ],
    },
    {
      title: "7. Créditos para vendedores",
      content: [
        "La Plataforma podrá otorgar créditos promocionales o de prueba a nuevos vendedores para utilizar determinadas funcionalidades dentro de la aplicación.",
        "Los vendedores podrán adquirir créditos prepagos para continuar operando dentro de La Plataforma.",
        "Los créditos serán descontados únicamente cuando una venta o contratación haya sido efectivamente concretada.",
        "Si no se concretan ventas, los créditos permanecerán disponibles en la cuenta del vendedor.",
        "La Plataforma podrá modificar el valor, porcentaje o modalidad de descuento de créditos cuando lo considere necesario.",
        "Los créditos no garantizan ventas, oportunidades comerciales ni resultados específicos.",
        "Los créditos no son reembolsables, no tienen devolución, no se reintegran y no poseen vencimiento, salvo promociones específicas informadas expresamente.",
      ],
    },
    {
      title: "8. Entregas y prestación de servicios",
      content: [
        "El vendedor será responsable de cumplir razonablemente con el pedido aceptado o servicio contratado según las condiciones ofrecidas en el presupuesto.",
        "El comprador será responsable de ingresar correctamente la dirección de entrega o datos necesarios para la prestación del servicio.",
        "La Plataforma no garantiza tiempos exactos de entrega ni disponibilidad permanente de productos o servicios.",
      ],
    },
    {
      title: "9. Cancelaciones y archivo de pedidos",
      content: [
        "El comprador podrá cancelar un pedido únicamente dentro de los estados habilitados por La Plataforma.",
        "Una vez confirmado el pago o iniciado el proceso de preparación, el pedido podrá quedar sujeto a restricciones de cancelación.",
        "Cuando un pago permanezca observado y el comprador no regularice la situación dentro de un tiempo razonable, el vendedor podrá archivar el pedido, dando por finalizado el proceso.",
        "Los pedidos archivados permanecerán registrados dentro del historial correspondiente.",
      ],
    },
    {
      title: "10. Reportes, conflictos y conductas indebidas",
      content: [
        "Compradores y vendedores podrán reportar inconvenientes, incumplimientos, pagos sospechosos, comportamientos abusivos, falta de entrega, fraude u otras situaciones indebidas mediante las herramientas habilitadas por La Plataforma.",
        "La Plataforma podrá solicitar pruebas o evidencia complementaria, incluyendo capturas, comprobantes, historial del pedido u otra información relevante antes de evaluar posibles medidas.",
        "La Plataforma podrá colaborar razonablemente en la revisión del caso, sin asumir obligación de resolución ni responsabilidad directa sobre acuerdos comerciales celebrados entre las partes.",
        "Las denuncias falsas, maliciosas o realizadas de mala fe también podrán derivar en sanciones.",
      ],
    },
    {
      title: "11. Sistema de calificaciones",
      content: [
        "Compradores y vendedores podrán calificarse mutuamente luego de finalizado un pedido o proceso habilitado por La Plataforma.",
        "Las calificaciones deberán representar experiencias reales y realizadas de buena fe.",
        "Intentos de manipulación, calificaciones falsas o abusivas podrán derivar en revisión o sanciones.",
      ],
    },
    {
      title: "12. Suspensión o baja de cuentas",
      content: [
        "La Plataforma podrá aplicar advertencias, limitaciones, suspensiones temporales o cierre definitivo de cuentas ante incumplimientos reiterados, fraude, falsificación de comprobantes, ausencia injustificada de entrega, comportamiento abusivo, uso indebido de la aplicación u otras conductas consideradas graves.",
      ],
    },
    {
      title: "13. Limitación de responsabilidad",
      content: [
        "La Plataforma actúa como intermediaria tecnológica entre compradores y vendedores/prestadores de servicios.",
        "La Plataforma no garantiza el cumplimiento de acuerdos comerciales, la calidad de productos o servicios, disponibilidad, exactitud de presupuestos ni tiempos de entrega.",
        "Sin perjuicio de colaborar razonablemente ante reportes o conflictos, La Plataforma no será responsable por pérdidas económicas, daños o incumplimientos derivados de acuerdos celebrados entre usuarios.",
      ],
    },
    {
      title: "14. Modificaciones",
      content: [
        "La Plataforma podrá modificar estos Términos y Condiciones cuando resulte necesario para mejorar el servicio, adaptarse a cambios operativos o cumplir nuevas exigencias.",
      ],
    },
    {
      title: "15. Contacto",
      content: [
        "Para consultas, reportes o soporte, los usuarios podrán utilizar los canales de contacto disponibles dentro de La Plataforma.",
      ],
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
          paddingBottom: Spacing.xxl,
        }}
      >
        <View
          style={{
            maxWidth: 500,
            width: "100%",
            alignSelf: "center",
            paddingTop: Spacing.md,
          }}
        >
          <Text
            style={{
              color: colors.textMuted,
              marginBottom: Spacing.xl,
              lineHeight: 22,
            }}
          >
            Última actualización: Mayo 2026
          </Text>

          {sections.map((section) => (
            <View key={section.title} style={{ marginBottom: Spacing.xxl }}>
              <Text
                style={{
                  color: colors.textDefault,
                  fontSize: 18,
                  fontWeight: "600",
                  marginBottom: Spacing.md,
                }}
              >
                {section.title}
              </Text>

              {section.content.map((paragraph, index) => (
                <Text
                  key={index}
                  style={{
                    color: colors.textDefault,
                    lineHeight: 24,
                    marginBottom: Spacing.md,
                  }}
                >
                  {paragraph}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
