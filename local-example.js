Ext.onReady(function() {
  var Company = Ext.data.Record.create([
    'company',
    'price',
    'change'
  ]);
  
  var store = new Ext.data.JsonStore({
    url: "getdata.php",
    root: "rows",
    autoLoad: true,
    fields: Company,
    sortInfo: {field: "company", direction: 'ASC'}
  });
  store.load();
  
  var filterRow = new Ext.ux.grid.FilterRow();
  
  var grid = new Ext.grid.GridPanel({
    store: store,
    columns: [
      {
        id: 'company',
        header: 'Company',
        width: 160,
        sortable: true,
        dataIndex: 'company',
        filter: {
          // test defaults to "/^{0}/i/"
        }
      },
      {
        header: 'Price',
        width: 75,
        sortable: true,
        renderer: 'usMoney',
        align: "right",
        dataIndex: 'price',
        filter: {
          // find prices greater than filter value
          test: function(filterValue, value) {
            return +value >= +filterValue;
          }
        }
      },
      {
        header: 'Change',
        width: 75,
        sortable: true,
        dataIndex: 'change',
        filter: {
          field: {
            xtype: "combo",
            mode: 'local',
            store: new Ext.data.ArrayStore({
              id: 0,
              fields: [
                'value'
              ],
              data: [['-'], ['up'], ['none'], ['down']]
            }),
            valueField: 'value',
            displayField: 'value',
            triggerAction: 'all',
            value: "-"
          },
          fieldEvents: ["select"],
          test: function(filterValue, value) {
            return filterValue === "-" || filterValue === value;
          }
        }
      }
    ],
    plugins: [filterRow],
    stripeRows: true,
    autoExpandColumn: 'company',
    height: 350,
    width: 450,
    title: 'Filtering with local store',
    renderTo: "local-grid-container",
    bbar: [
      {
        text: "Reload",
        handler: function() {
          store.load();
        }
      },
      {
        text: "Add",
        handler: function() {
          store.addSorted(new Company({
            company: "Google Inc",
            price: 150.7,
            change: "up"
          }));
        }
      }
    ]
  });
  
});
