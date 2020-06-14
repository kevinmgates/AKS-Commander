var nodesOptions =
    [
        "node-count;Number of nodes in the Kubernetes node pool. After creating a cluster, you can change the size of its node pool with az aks scale. Default value: 3.;3",
        "enable-cluster-autoscaler;Enable cluster autoscaler, default value is false.;null",
        "min-count;Minimum nodes count used for autoscaler, when '--enable-cluster-autoscaler' specified. Please specify the value in the range of [1, 100].;1",
        "max-count;Maximum nodes count used for autoscaler, when '--enable-cluster-autoscaler' specified. Please specify the value in the range of [1, 100].;3",
        "admin-username;User account to create on node VMs for SSH access.;adminUsername",
        "vm-set-type;Agent pool vm set type. VirtualMachineScaleSets or AvailabilitySet.;VirtualMachineScaleSets",
        "max-pods;The maximum number of pods deployable to a node.;20",
        "zones;Availability zones where agent nodes will be placed. accepted values: 1, 2, 3;1, 2, 3",
        "node-osdisk-size;Size in GB of the OS disk for each node in the node pool. Minimum 30 GB.;30",
        "node-vm-size;Size of Virtual Machines to create as Kubernetes nodes. Default value: Standard_D2s_v3.;Standard_D2s_v3",
        "nodepool-labels;Space-separated labels: key[=value] [key[=value] ...]. You can not change the node labels through CLI after creation. See https://aka.ms/node-labels for syntax of labels.;key[=value]",
        "nodepool-name;Node pool name, up to 12 alphanumeric characters. Default value: nodepool1.;nodepool1",
        "nodepool-tags;Space-separated tags: key[=value] [key[=value] ...]. Use '' to clear existing tags.;key[=value]",
        "windows-admin-username;Username to create on Windows node VMs.;adminUsername",
        "windows-admin-password;Password to create on Windows node VMs.;adminPassword",
        "generate-ssh-keys;Generate SSH public and private key files if missing. The keys will be stored in the ~/.ssh directory.;null",
        "no-ssh-key;Do not use or create a local SSH key.;null",
        "ssh-key-value;Public key path or key contents to install on node VMs for SSH access. Default value: ~\.ssh\id_rsa.pub.;ssh-rsa AAAAB... azureuser@linuxvm"
    ];

var clusterOptions = 
    [
        "attach-acr;Grant the 'acrpull' role assignment to the ACR specified by name or resource ID.;acr_name",
        "enable-addons;Enable the Kubernetes addons in a comma-separated list.;monitoring, virtual-node",
        "kubernetes-version;Version of Kubernetes to use for creating the cluster, such as '1.11.8' or '1.12.6'.;1.16.9",
        "location;Location. Values from: az account list-locations. You can configure the default location using az configure --defaults location=<location>.;eastus, westus",
        "subscription;Name or ID of subscription. You can configure the default subscription using az account set -s NAME_OR_ID.;00000000-0000-0000-0000-000000000000",
        "tags;Space-separated tags: key[=value] [key[=value] ...]. Use \"\" to clear existing tags.;key[=value]",
        "uptime-sla;Enable a paid managed cluster service with a financially backed SLA.;null",
        "workspace-resource-id;The resource ID of an existing Log Analytics Workspace to use for storing monitoring data. If not specified, uses the default Log Analytics Workspace if it exists, otherwise creates one.;00000000-0000-0000-0000-000000000000"
    ];

var azureADOptions =
    [
        "enable-managed-identity;Using a system assigned managed identity to manage cluster resource group.;null",
        "disable-rbac;Disable Kubernetes Role-Based Access Control.;null",
        "enable-rbac;Enable Kubernetes Role-Based Access Control. Default: enabled.;null",
        "aad-client-app-id;The ID of an Azure Active Directory client application of type 'Native'. This application is for user login via kubectl.;00000000-0000-0000-0000-000000000000",
        "aad-server-app-id;The ID of an Azure Active Directory server application of type 'Web app/API'. This application represents the managed cluster's apiserver (Server application).;00000000-0000-0000-0000-000000000000",
        "aad-server-app-secret;The secret of an Azure Active Directory server application.;00000000-0000-0000-0000-000000000000",
        "aad-tenant-id;The ID of an Azure Active Directory tenant.;00000000-0000-0000-0000-000000000000",
        "service-principal;Service principal used for authentication to Azure APIs.;00000000-0000-0000-0000-000000000000",
        "client-secret;Secret associated with the service principal. This argument is required if --service-principal is specified.;00000000-0000-0000-0000-000000000000"
    ];

var networkingOptions =
    [
        "api-server-authorized-ip-ranges;Comma seperated list of authorized apiserver IP ranges. Set to 0.0.0.0/32 to restrict apiserver traffic to node pools.;0.0.0.0",
        "enable-private-cluster;Enable private cluster.;null",
        "network-plugin;The Kubernetes network plugin to use. Accepted values: azure, kubenet.;azure -or- kubenet",
        "load-balancer-idle-timeout;Load balancer idle timeout in minutes.;5",
        "load-balancer-managed-outbound-ip-count;Load balancer managed outbound IP count.",
        "load-balancer-outbound-ip-prefixes;Load balancer outbound IP prefix resource IDs.",
        "load-balancer-outbound-ips;Load balancer outbound IP resource IDs.",
        "load-balancer-outbound-ports;Load balancer outbound allocated ports.",
        "load-balancer-sku;Azure Load Balancer SKU selection for your cluster.;Basic -or- standard",
        "dns-name-prefix;Prefix for hostnames that are created. If not specified, generate a hostname using the managed cluster and resource group names.;myPrefix",
        "dns-service-ip;An IP address assigned to the Kubernetes DNS service.;192.168.1.5",
        "docker-bridge-address;A specific IP address and netmask for the Docker bridge, using standard CIDR notation.",
        "enable-node-public-ip;Enable VMSS node public IP.;null",
        "network-policy;The Kubernetes network policy to use.",
        "outbound-type;How outbound traffic will be configured for a cluster. Accepted values: loadBalancer, userDefinedRouting.;loadBalancer, userDefinedRouting",
        "pod-cidr;A CIDR notation IP range from which to assign pod IPs when kubenet is used.",
        "service-cidr;A CIDR notation IP range from which to assign service cluster IPs.",
        "skip-subnet-role-assignment;Skip role assignment for subnet (advanced networking).;null",
        "vnet-subnet-id;The ID of a subnet in an existing VNet into which to deploy the cluster."
    ];

function toggleOptionName(source){
    if (document.getElementById(source).className.indexOf("show") > -1){
        // sub panel is shown, hide it
        hideOptions(source);
        document.getElementById(source.replace("-div", "") + "OptionName").className = document.getElementById(source.replace("-div", "") + "OptionName").className.replace(" highlight", ""); 
    }
    else{
        //sub panel is hidden, show it
        showOptions(source);
        document.getElementById(source.replace("-div", "") + "OptionName").className += " highlight";
    } 
}

function showOptions(source){
    document.getElementById(source).className = document.getElementById(source).className.replace("hide", "show");
}

function hideOptions(source){
    document.getElementById(source).className = document.getElementById(source).className.replace("show", "hide");
}

function buildCommands(){
    var buildCommand = "";
    var x = document.getElementsByTagName("input");
    var i;
    for (i = 0; i < x.length; i++) {
        if (x[i].checked == true){
            buildCommand += "--" + x[i].id + " ";
            if(document.getElementById(x[i].id + "-value").value != "disabled"){
                buildCommand += document.getElementById(x[i].id + "-value").value + " ";
            }    
        }
    }
    document.getElementById("aksCommands").innerText = " az aks create --name " + document.getElementById("clusterName-value").value + " --resource-group " + document.getElementById("resourceGroup-value").value + " " + buildCommand;
}

function loadOptions(){
    populateOptions(nodesOptions, "nodes-div");
    populateOptions(clusterOptions, "cluster-div");
    populateOptions(azureADOptions, "aad-div");
    populateOptions(networkingOptions, "networking-div");
}

function populateOptions(optionsList, targetDiv){
    var i_option = "";
    var HTML = "";
    
    for (var i = 0, option; option = optionsList[i]; i++) {
        i_option = option.split(";");
        // 0 = option name
        // 1 = description
        // 2 = null for no value
        // 3 = placeholder value
        HTML += "<div class='subSection'><input type='checkbox' id='" + i_option[0] + "' onclick='toggleSubOptions(this)'><span class='subOptionName'>--" + i_option[0] + "</span>&nbsp;-&nbsp;<span class='subDesc'>" + i_option[1] + "</span><br/>";
        //check if the value textbox is set to null or a placeholder value
        if(i_option[2]){
            //make sure it is null
            if(i_option[2] == "null"){
                //hide the textbox and set the value to 'disabled' so buildCommands() ignores it
                HTML += "<input type='text' id='" + i_option[0] + "-value' class='subValue hide' value='disabled'></div>";
            } else {
                //set placeholder value
                HTML += "<input type='text' id='" + i_option[0] + "-value' class='subValue hide' placeholder=' e.g., " + i_option[2] + "'></div>";
            }
        } else {
            //hiding textboxes by default for a cleaner look
            HTML += "<input type='text' id='" + i_option[0] + "-value' class='subValue hide' placeholder=' Value'></div>";
        }
    }
    document.getElementById(targetDiv).innerHTML = "<div class='subOptionsContainer'>" + HTML + "</div>";
}

function toggleSubOptions(source){
    //when checked, only show the value textbox for options that require a value to be defined
    if (document.getElementById(source.id).checked == true && document.getElementById(source.id + "-value").value != "disabled"){
        //show the value textbox
        document.getElementById(source.id + "-value").className = document.getElementById(source.id + "-value").className.replace("hide", "show");
    }
    else{
        //hide the value textbox
        document.getElementById(source.id + "-value").className = document.getElementById(source.id + "-value").className.replace("show", "hide");
    } 
}