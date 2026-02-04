"use client"

import { WorkoutPlan } from "@/types/workout-plan";
import { capitalize } from "@/utils/string-utils";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: {
    backgroundColor: "#0a0a0a",
    padding: 20,
    color: '#fafafa',
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    width: "31%",
    backgroundColor: "#212121",
    borderRadius: 8,
    border: "1px solid #086129",
    padding: 16,
  },
  cardHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "#22c55e",
    marginBottom: 4,
  },
  routineName: {
    fontSize: 14,
    fontWeight: 700,
    color: "#FFFFFF",
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: 600,
    color: "#FFFFFF",
  },
  exerciseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },
  exerciseName: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: 400,
  },
  exerciseSets: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: 400,
  },
  tableCaption: {
    fontSize: 9,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 12,
  },
  descriptionBox: {
    backgroundColor: '#27272a',
    borderLeft: '4px solid #086129',
    borderRadius: 2,
    padding: 12,
    color: 'white',
    fontSize: 11,
    marginBottom: 12,
    marginTop: 12,
  },
})

const WorkoutPlanPDF = ({ workoutPlan }: { workoutPlan: WorkoutPlan }) => {
  const { routines, name, description } = workoutPlan;
  const formattedName = name.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Text style={styles.title}>{formattedName}</Text>
        <View style={styles.grid} >
          {routines.map((routine) => (
            <View key={routine.id} style={styles.card} wrap={false}>
              <View style={styles.cardHeader}>
                <Text style={styles.dayLabel}>{capitalize(routine.desirableDayOfWeek)}</Text>
                <Text style={styles.routineName}>{routine.name}</Text>
              </View>

              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Exercises</Text>
                <Text style={styles.tableHeaderText}>SxR</Text>
              </View>

              {routine.exercises.map((exercise) => (
                <View key={exercise.id} style={styles.exerciseRow}>
                  <Text style={styles.exerciseName}>{exercise.exercise.name}</Text>
                  <Text style={styles.exerciseSets}>
                    {exercise.desirableSets}×{exercise.desirableReps}
                  </Text>
                </View>
              ))}

              <Text style={styles.tableCaption}>{capitalize(routine.desirableDayOfWeek)} Exercises</Text>
            </View>
          ))}
        </View>
        <View style={styles.descriptionBox} break>
          <Text>{description}</Text>
        </View>
      </Page>
    </Document>
  )
}

export default WorkoutPlanPDF;
