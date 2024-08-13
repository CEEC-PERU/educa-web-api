const { getStudentCountByCourse } = require('../../services/courses/metricasCorporate');

async function getStudentCount(req, res) {
  try {
    const { enterprise_id } = req.params;
    const chartData = await getStudentCountByCourse(enterprise_id);
    return res.status(200).json(chartData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { getStudentCount };
