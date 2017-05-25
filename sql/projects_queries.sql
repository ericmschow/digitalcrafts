
-- 1 What are all projects that use JavaScript?
SELECT * FROM project JOIN project_uses_tech ON project_uses_tech.project_id =
project.id JOIN tech ON project_uses_tech.tech_id = tech.id WHERE tech.name =
'JavaScript';

-- 2 What are all technologies used by the Personal Website?
SELECT * FROM project JOIN project_uses_tech ON project_uses_tech.project_id =
project.id JOIN tech ON project_uses_tech.tech_id = tech.id WHERE project.name =
'Personal Website';

-- 3 Perform a left outer join from the tech table to the project_uses_tech table
-- - which techs has no associated project? ANSWER: Ruby, Javascript, Java
SELECT * FROM tech
LEFT OUTER JOIN project_uses_tech
ON project_uses_tech.tech_id = tech.id
ORDER BY project_id DESC;

-- 4 Based on the previous query, get the count of the number of techs used by
-- each project.

SELECT project.name, count(tech_id) AS total FROM project_uses_tech
LEFT OUTER JOIN project
ON project.id = project_uses_tech.project_id
INNER JOIN tech
ON tech.id = project_uses_tech.tech_id
GROUP BY project.name
ORDER BY total DESC


-- 5 Perform a left outer join from the project table to the project_users_tech
-- table - which projects has no associated tech?

SELECT project.name, project_uses_tech.tech_id FROM project
LEFT OUTER JOIN project_uses_tech
ON project_uses_tech.project_id = project.id
WHERE tech_id IS NULL

-- 6 Based on the previous query, get the count of the number of projects that use
-- each tech.

SELECT tech.name, count(project_uses_tech.project_id) AS total FROM tech
LEFT OUTER JOIN project_uses_tech
ON project_uses_tech.tech_id = tech.id
GROUP BY tech.name
ORDER BY total DESC

-- 7 List all projects along with each technology used by it. You will need to do
-- a three-way join.

SELECT project.name, tech.name FROM project
LEFT OUTER JOIN project_uses_tech
ON project_uses_tech.project_id = project.id
INNER JOIN tech
ON tech.id = project_uses_tech.tech_id
ORDER BY project.name

-- 8 List all the distinct techs that are used by at least one project.

SELECT DISTINCT(tech.name) FROM tech
LEFT OUTER JOIN project_uses_tech
ON project_uses_tech.tech_id = tech.id
INNER JOIN project
ON project.id = project_uses_tech.project_id

-- 9 List all the distinct techs that are not used by any projects.

SELECT * FROM tech
LEFT OUTER JOIN project_uses_tech
ON project_uses_tech.tech_id = tech.id
WHERE project_id IS NULL

-- 10 List all the distinct projects that use at least one tech.

SELECT DISTINCT(project.name) FROM project
LEFT OUTER JOIN project_uses_tech
ON project_uses_tech.project_id = project.id
INNER JOIN tech
ON tech.id = project_uses_tech.tech_id


-- 11 List all the distinct projects that use no tech.

SELECT * FROM project
LEFT OUTER JOIN project_uses_tech
ON project_uses_tech.project_id = project.id
WHERE tech_id IS NULL

-- 12 Order the projects by how many tech it uses.

SELECT DISTINCT(project.name), COUNT(tech.id) AS total FROM project
LEFT OUTER JOIN project_uses_tech
ON project_uses_tech.project_id = project.id
INNER JOIN tech
ON tech.id = project_uses_tech.tech_id
GROUP BY project.name
ORDER BY total DESC

-- 13 Order the tech by how many projects use it.

SELECT DISTINCT(tech.name), COUNT(project.id) AS total FROM tech
LEFT OUTER JOIN project_uses_tech
ON project_uses_tech.tech_id = tech.id
INNER JOIN project
ON project.id = project_uses_tech.project_id
GROUP BY tech.name
ORDER BY total DESC

-- 14 What is the average number of techs used by a project?

SELECT AVG(COUNT)
FROM (
	SELECT
	DISTINCT(project.id),
	COUNT(tech.name)
	FROM project
	LEFT OUTER JOIN project_uses_tech
	ON project_uses_tech.project_id = project.id
	LEFT OUTER JOIN tech
	ON tech.id = project_uses_tech.tech_id
	GROUP BY project.id
) AS avg_techs
