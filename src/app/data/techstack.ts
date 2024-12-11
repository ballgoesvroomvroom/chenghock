import { StaticImageData } from "next/image"

import psql_logo from "@/public/ext_logos/psql.png"
import figma_logo from "@/public/ext_logos/figma.png"
import react_logo from "@/public/ext_logos/react.png"
import ts_logo from "@/public/ext_logos/ts.png"
import hadoop_logo from "@/public/ext_logos/hadoop.png"
import docker_logo from "@/public/ext_logos/docker.png"
import powerbi_logo from "@/public/ext_logos/powerbi.png"
import sklearn_logo from "@/public/ext_logos/sklearn.png"


export const TechStack: {[group: string]: { [skill: string]: [StaticImageData] }} = {
	"Data science": {
		"Hadoop": [hadoop_logo],
		"PowerBI": [powerbi_logo],
		"Sci-kit learn": [sklearn_logo],
	},
	"Web development": {
		"PostgreSQL": [psql_logo],
		"Figma": [figma_logo],
		"React": [react_logo],
		"Typescript": [ts_logo],
		"Docker": [docker_logo],
	}
}

export const Group: string[] = ["Data science", "Web development"]
export const GroupColor: string[] = ["#fcba03", "#377ef0"]
export const TotalOrder: [number, string][] = [[1, "PostgreSQL"], [0, "Hadoop"], [1, "React"], [0, "PowerBI"], [1, "Typescript"], [1, "Figma"], [1, "Docker"], [0, "Sci-kit learn"]]