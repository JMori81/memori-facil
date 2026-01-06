import React, { useState, useEffect } from 'react';
import {
  X, LayoutGrid, Calculator, Search, BookOpen, Edit3,
  Hammer, Paintbrush, Zap, Droplets, Home, Sparkles,
  ClipboardList, Layers, ArrowLeft
} from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { ServiceItem } from '../types';
import { cdhuCatalog, getCatalog, getCatalogVersion, CDHUItem } from '../data/cdhuCatalog';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddService: (service: ServiceItem) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, onAddService }) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'catalog'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Use dynamic catalog
  const currentCatalog = getCatalog();
  const catalogVersion = getCatalogVersion();

  // Categories
  const categories = Array.from(new Set(currentCatalog.map(item => item.category)));

  const filteredCatalog = currentCatalog.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.includes(searchQuery);
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });
  const [description, setDescription] = useState('');
  const [detailedSpec, setDetailedSpec] = useState('');
  const [memorialDef, setMemorialDef] = useState<any>(null);

  // Calculator Fields
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [area, setArea] = useState<string>(''); // Computed or manual

  const [environment, setEnvironment] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');

  // Cost Data
  const [code, setCode] = useState('');
  const [source, setSource] = useState('CDHU');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('m²');
  const [materialPrice, setMaterialPrice] = useState(0);
  const [laborPrice, setLaborPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);



  // Icon Mapping
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Serviços Preliminares': return <ClipboardList size={32} />;
      case 'Demolições': return <Hammer size={32} />;
      case 'Pisos e Revestimentos': return <LayoutGrid size={32} />;
      case 'Pintura': return <Paintbrush size={32} />;
      case 'Forro': return <Layers size={32} />;
      case 'Elétrica': return <Zap size={32} />;
      case 'Hidráulica': return <Droplets size={32} />;
      case 'Telhado': return <Home size={32} />;
      case 'Limpeza': return <Sparkles size={32} />;
      default: return <LayoutGrid size={32} />;
    }
  };

  // Auto-calculate area when width/length change
  useEffect(() => {
    const w = parseFloat(width);
    const l = parseFloat(length);
    if (!isNaN(w) && !isNaN(l) && w > 0 && l > 0) {
      setArea((w * l).toFixed(2));
    }
  }, [width, length]);

  useEffect(() => {
    const numericArea = parseFloat(area) || 0;
    setSubtotal((materialPrice + laborPrice) * numericArea);
  }, [area, materialPrice, laborPrice]);

  const handleCatalogSelect = (item: CDHUItem) => {
    setCode(item.code);
    setDescription(item.description);
    setDetailedSpec(item.detailedSpec || '');
    setMemorialDef(item.memorialDef || null);
    setCategory(item.category);
    setUnit(item.unit);
    // CDHU price is usually total, simplified split here for demo
    setMaterialPrice(Number((item.price * 0.6).toFixed(2)));
    setLaborPrice(Number((item.price * 0.4).toFixed(2)));

    // Clear calculator
    setWidth('');
    setLength('');
    setArea('');

    setActiveTab('manual');
  };

  const handleClose = () => {
    setArea('');
    setWidth('');
    setLength('');
    setEnvironment('');
    setBrand('');
    setModel('');
    setDescription('');
    setDetailedSpec('');
    setMemorialDef(null);
    setCategory('');
    setCode('');
    setMaterialPrice(0);
    setLaborPrice(0);
    setSearchQuery('');
    setSelectedCategory(null);
    setActiveTab('catalog');
    onClose();
  }

  const handleSubmit = () => {
    if (onAddService) {
      const numericArea = parseFloat(area) || 0;
      if (numericArea <= 0) {
        alert("Por favor, insira uma quantidade válida.");
        return;
      }

      let finalName = description;
      if (brand || model) {
        finalName += ` (Ref: ${brand} ${model})`;
      }

      const newItem: ServiceItem = {
        id: Math.random().toString(36).substr(2, 9),
        code,
        source,
        category: category || 'Outros',
        name: finalName,
        unit,
        area: numericArea,
        environment,
        existingFloor: detailedSpec,
        newFloor: '',
        brand,
        model,
        materialPrice,
        laborPrice,
        memorialDef
      };
      onAddService(newItem);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl flex flex-col max-h-[90vh]">

          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg text-blue-700">
                <LayoutGrid size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  Adicionar Serviço
                  {activeTab === 'catalog' && (
                    <span className="text-xs font-normal px-2 py-1 bg-green-100 text-green-800 rounded-full border border-green-200">
                      {catalogVersion}
                    </span>
                  )}
                </h3>
                <p className="text-xs text-gray-500">Selecione do catálogo ou insira manualmente</p>
              </div>
            </div>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-500 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 shrink-0">
            <button
              className={`flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors ${activeTab === 'catalog' ? 'border-blue-500 text-blue-600 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('catalog')}
            >
              <div className="flex items-center justify-center gap-2">
                <BookOpen size={16} />
                Catálogo
              </div>
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors ${activeTab === 'manual' ? 'border-blue-500 text-blue-600 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('manual')}
            >
              <div className="flex items-center justify-center gap-2">
                <Edit3 size={16} />
                Edição / Manual
              </div>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">

            {activeTab === 'catalog' && (
              <div className="space-y-4">

                {/* Breadcrumb / Navigation */}
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium mb-4"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    Voltar para Categorias
                  </button>
                )}

                {!selectedCategory ? (
                  /* Category Grid View */
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 hover:bg-blue-50 transition-all text-center aspect-square"
                      >
                        <div className="text-blue-600 mb-3">
                          {getCategoryIcon(cat)}
                        </div>
                        <span className="font-semibold text-gray-800 text-sm">{cat}</span>
                        <span className="text-xs text-gray-500 mt-1">
                          {cdhuCatalog.filter(i => i.category === cat).length} serviços
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  /* Filtered List View */
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-blue-600">{getCategoryIcon(selectedCategory)}</span>
                      {selectedCategory}
                    </h3>

                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder={`Buscar em ${selectedCategory}...`}
                        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>

                    <div className="bg-white border rounded-lg divide-y overflow-hidden max-h-[400px] overflow-y-auto shadow-sm">
                      {filteredCatalog.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                          Nenhum serviço encontrado.
                        </div>
                      ) : (
                        filteredCatalog.map((item) => (
                          <div
                            key={item.code}
                            className="p-4 hover:bg-blue-50 cursor-pointer transition-colors flex justify-between items-center group"
                            onClick={() => handleCatalogSelect(item)}
                          >
                            <div className="flex-1 pr-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded border">
                                  {item.code}
                                </span>
                              </div>
                              <p className="font-medium text-gray-900">{item.description}</p>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.detailedSpec}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-bold text-gray-900">R$ {item.price.toFixed(2)}</div>
                              <div className="text-xs text-gray-500">/ {item.unit}</div>
                              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">Selecionar</span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'manual' && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <label className="block text-xs font-bold text-blue-800 uppercase mb-2">Serviço Selecionado</label>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-sm bg-white px-2 py-1 rounded border border-blue-200 text-blue-900 font-bold">{code || '00.00.000'}</span>
                    <span className="text-lg font-bold text-blue-900">{description || 'Selecione um item do catálogo...'}</span>
                  </div>
                  {detailedSpec && (
                    <div className="bg-white/50 p-3 rounded text-sm text-blue-800 border border-blue-100 italic">
                      " {detailedSpec} "
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Area Calculator Section */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200 md:col-span-2 shadow-sm">
                    <h5 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <Calculator size={16} /> Calculadora de Quantidade
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Largura (m)</label>
                        <input
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          className="block w-full rounded border-gray-300 text-sm py-2"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Comprimento (m)</label>
                        <input
                          type="number"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                          className="block w-full rounded border-gray-300 text-sm py-2"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Total ({unit})</label>
                        <input
                          type="number"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          className="block w-full rounded-lg border-blue-400 bg-white ring-2 ring-blue-100 pl-3 pr-8 py-2 text-blue-900 font-bold"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>

                  <Input
                    label="Ambiente / Local"
                    placeholder="Ex: Sala 01, Fachada Sul..."
                    value={environment}
                    onChange={(e) => setEnvironment(e.target.value)}
                  />

                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                    <Input
                      label="Detalhes / Marca (Opcional)"
                      placeholder="Ex: Portinari, Suvinil..."
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                    <Input
                      label="Modelo / Cor (Opcional)"
                      placeholder="Ex: Branco Neve..."
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>
                </div>

                {/* Cost Estimation */}
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3 text-gray-700 font-medium text-sm">
                    <Calculator size={16} />
                    ESTIMATIVA DE CUSTO ({source})
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Material ({unit})</p>
                      <p className="text-lg font-semibold text-gray-900">R$ {materialPrice.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Mão de Obra ({unit})</p>
                      <p className="text-lg font-semibold text-gray-900">R$ {laborPrice.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 font-bold uppercase">Subtotal</p>
                      <p className="text-2xl font-bold text-blue-900">R$ {subtotal.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse gap-3 border-t border-gray-100 shrink-0">
            {activeTab === 'manual' ? (
              <>
                <Button onClick={handleSubmit}>
                  Confirmar e Adicionar
                </Button>
                <Button variant="outline" onClick={() => setActiveTab('catalog')}>
                  Voltar ao Catálogo
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};