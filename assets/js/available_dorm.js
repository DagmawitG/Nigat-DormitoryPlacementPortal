$(document).ready(function() {
    $('#example tfoot th').each(function() {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });

    var table = $('#example').DataTable({
        searchPanes: {
        viewTotal: true
        },
        dom: 'Plfrtip'
    });

    table.columns().every( function() {
        var that = this;

        $('input', this.footer()).on('keyup change', function() {
            if (that.search() !== this.value) {
                that
                .search(this.value)
                .draw();
            }
        });
    });
});