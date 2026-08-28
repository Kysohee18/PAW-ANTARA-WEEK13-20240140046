const STATUS_COLORS = {
  pending: 'yellow',
  diproses: 'blue',
  dikirim: 'blue',
  selesai: 'green',
  dibatalkan: 'red',
};

function statusColor(status) {
  return STATUS_COLORS[status] || 'gray';
}

module.exports = { statusColor };
