"use client";

import { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileTextIcon, DownloadIcon } from "lucide-react";

interface InventoryItem {
  id: string;
  element: string;
  class: string;
  subclass?: string | null;
  brand?: string | null;
  totalQuantity: number;
  availableQuantity: number;
}

interface ReportPageProps {
  inventory: InventoryItem[];
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#1a365d",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    color: "#2d3748",
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    minHeight: 35,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f7fafc",
    width: "16.66%",
    padding: 8,
    fontSize: 12,
    fontWeight: "bold",
    color: "#2d3748",
  },
  tableCell: {
    width: "16.66%",
    padding: 8,
    fontSize: 10,
    color: "#4a5568",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 10,
    color: "#718096",
    textAlign: "center",
  },
  summary: {
    marginTop: 20,
    fontSize: 12,
    color: "#4a5568",
  },
});

const InventoryPDF = ({ data }: { data: InventoryItem[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Reporte de Inventario</Text>
      <Text style={styles.subtitle}>
        Fecha: {new Date().toLocaleDateString("es-ES")}
      </Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Elemento</Text>
          <Text style={styles.tableHeader}>Clase</Text>
          <Text style={styles.tableHeader}>Subclase</Text>
          <Text style={styles.tableHeader}>Marca</Text>
          <Text style={styles.tableHeader}>Cantidad Total</Text>
          <Text style={styles.tableHeader}>Disponible</Text>
        </View>
        {data.map((item) => (
          <View style={styles.tableRow} key={item.id}>
            <Text style={styles.tableCell}>{item.element}</Text>
            <Text style={styles.tableCell}>{item.class}</Text>
            <Text style={styles.tableCell}>{item.subclass || "-"}</Text>
            <Text style={styles.tableCell}>{item.brand || "-"}</Text>
            <Text style={styles.tableCell}>{item.totalQuantity}</Text>
            <Text style={styles.tableCell}>{item.availableQuantity}</Text>
          </View>
        ))}
      </View>

      <View style={styles.summary}>
        <Text>
          Total de elementos:{" "}
          {data.reduce((acc, item) => acc + item.totalQuantity, 0)}
        </Text>
        <Text>
          Total disponible:{" "}
          {data.reduce((acc, item) => acc + item.availableQuantity, 0)}
        </Text>
      </View>

      <Text style={styles.footer}>
        Reporte generado el {new Date().toLocaleString("es-ES")}
      </Text>
    </Page>
  </Document>
);

export default function ReportPage({ inventory }: ReportPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const blob = await pdf(<InventoryPDF data={inventory} />).toBlob();
      const fileName = `inventario-${
        new Date().toISOString().split("T")[0]
      }.pdf`;

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      }, 100);
    } catch (err) {
      setError("Error al generar el PDF");
      console.error("Error generating PDF:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-auto"
      onClick={handleGenerateReport}
      disabled={isLoading || inventory.length === 0}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Generando PDF...</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <DownloadIcon className="h-4 w-4" />
          <span>Descargar PDF</span>
        </div>
      )}
    </Button>
  );
}
