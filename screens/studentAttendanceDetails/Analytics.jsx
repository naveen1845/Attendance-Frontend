import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, ScrollView, StyleSheet, Dimensions, View } from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#161B33",
  backgroundGradientTo: "#161B33",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`, // Gold for contrast
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: "2",
    stroke: "#FFD700", // Gold border
  },
  propsForLabels: {
    fontSize: 10,
  }
};

const Analytics = () => {
  const route = useRoute();
  const { data } = route.params || {};

  if (!Array.isArray(data) || data.length === 0) {
    return <Text style={styles.errorText}>No data available</Text>;
  }

  const allStudents = data.map((record) => record.students).flat();

  if (allStudents.length === 0) {
    return <Text style={styles.errorText}>No student data available</Text>;
  }

  const totalStudents = allStudents.length;
  const presentCount = allStudents.filter((s) => s.isPresent).length;
  const absentCount = totalStudents - presentCount;
  const labels = data.map((record) => {
    if (!record.date) return "Unknown";
    
    const localDate = new Date(record.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }); // Converts to local date format (DD/MM/YYYY)
    
    return localDate;
  });
  
  const trendData = data.map((record) =>
    Array.isArray(record.students)
      ? (record.students.filter((s) => s.isPresent).length / record.students.length) * 100
      : 0
  );

  const lineChartData = { labels, datasets: [{ data: trendData }] };
  const barChartData = { labels: ["Present", "Absent"], datasets: [{ data: [presentCount, absentCount] }] };
  const pieChartData = [
    { name: "Present", population: presentCount, color: "#4CAF50", legendFontColor: "#FFD700", legendFontSize: 12 },
    { name: "Absent", population: absentCount, color: "#F44336", legendFontColor: "#FFD700", legendFontSize: 12 },
  ];

  return (
    <View style={styles.container}>
      <ScrollView >
        <View style={styles.header}>
          <Text style={styles.headerText}>Attendance Overview</Text>
        </View>
        
        <Text style={styles.chartTitle}>Attendance Trends</Text>
        <LineChart 
          data={lineChartData} 
          width={screenWidth} 
          height={200} 
          chartConfig={chartConfig} 
          bezier 
          fromZero 
          verticalLabelRotation={90}
          style={{ paddingBottom: 25}}
        />
        
        <Text style={styles.chartTitle}>Present vs Absent</Text>
        <BarChart data={barChartData} width={screenWidth} height={200} chartConfig={chartConfig} style={{ paddingBottom: 10}} fromZero />
        
        <Text style={styles.chartTitle}>Attendance Distribution</Text>
        <PieChart style={{paddingLeft: 20}} data={pieChartData} width={screenWidth} height={200} accessor="population" backgroundColor="transparent" chartConfig={chartConfig} />
      </ScrollView>
      <View style={styles.footer}>
              <Text style={styles.footerText}>© 2025 Attendance - Naveen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F24"},
  header: {
    backgroundColor: "#161B33",
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 6,
    borderBottomWidth: 2,
    borderBottomColor: "#FFD700",
  },
  headerText: { color: "#FFD700", fontSize: 18, fontWeight: "bold", textTransform: "uppercase" },
  chartTitle: { color: "#FFD700", fontSize: 16, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  errorText: { fontSize: 16, color: "red", textAlign: "center", marginTop: 20 },
  footer: {
    backgroundColor: '#161B33',
    paddingVertical: 10,
    paddingBottom: 20,
    alignItems: 'center',
    marginTop: 'auto',
    borderTopWidth: 2,
    borderTopColor: '#FFD700',
  },
  footerText: {
    color: '#FFD700',
    fontSize: 8,
  },
});

export default Analytics;
